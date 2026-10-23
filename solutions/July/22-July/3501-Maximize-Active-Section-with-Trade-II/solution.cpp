#include <vector>
#include <string>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3501 - Maximize Active Section with Trade II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> maxActiveSectionsAfterTrade(string s, vector<vector<int>>& queries) {
        int n = s.length();

        // 1. Run-length encode s
        vector<vector<int>> runs;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s[j] == s[i]) j++;
            runs.push_back({i, j - 1, s[i] - '0'});
            i = j;
        }

        int totalOnes = 0;
        for (char c : s) if (c == '1') totalOnes++;

        int m = runs.size();

        // 2. Collect candidate interior 1-runs
        vector<int> candStart, candEnd, fullZL, fullZR, fullG;
        for (int idx = 1; idx < m - 1; idx++) {
            if (runs[idx][2] == 1) {
                int zl = runs[idx][0] - runs[idx - 1][0];
                int zr = runs[idx + 1][1] - runs[idx][1];
                candStart.push_back(runs[idx][0]);
                candEnd.push_back(runs[idx][1]);
                fullZL.push_back(zl);
                fullZR.push_back(zr);
                fullG.push_back(zl + zr);
            }
        }

        int cnt = candStart.size();

        // 3. Sparse table over fullG for O(1) range-max queries
        vector<int> log2(cnt + 1, 0);
        for (int k = 2; k <= cnt; k++) log2[k] = log2[k / 2] + 1;

        int LOG = cnt > 0 ? log2[cnt] : 0;
        vector<vector<int>> sparse(LOG + 1, vector<int>(cnt, 0));
        if (cnt > 0) {
            sparse[0] = fullG;
            for (int k = 1; k <= LOG; k++) {
                int half = 1 << (k - 1);
                for (int idx = 0; idx + (1 << k) <= cnt; idx++) {
                    sparse[k][idx] = max(sparse[k - 1][idx], sparse[k - 1][idx + half]);
                }
            }
        }

        // 4. Answer queries
        vector<int> ans;
        ans.reserve(queries.size());

        for (const auto& q : queries) {
            int l = q[0], r = q[1];
            int result = totalOnes;

            if (cnt > 0) {
                int iLo = upper_bound(candStart.begin(), candStart.end(), l) - candStart.begin();
                int iHi = (lower_bound(candEnd.begin(), candEnd.end(), r) - candEnd.begin()) - 1;

                if (iLo <= iHi && iLo < cnt && iHi >= 0) {
                    int gain = 0;

                    if (iHi - iLo >= 2) {
                        int lo = iLo + 1, hi = iHi - 1;
                        int len = hi - lo + 1;
                        int kk = log2[len];
                        gain = max(gain, max(sparse[kk][lo], sparse[kk][hi - (1 << kk) + 1]));
                    }

                    int clipLo = min(candStart[iLo] - l, fullZL[iLo])
                               + min(r - candEnd[iLo], fullZR[iLo]);
                    int clipHi = min(candStart[iHi] - l, fullZL[iHi])
                               + min(r - candEnd[iHi], fullZR[iHi]);

                    gain = max({gain, clipLo, clipHi});
                    result += gain;
                }
            }

            ans.push_back(result);
        }

        return ans;
    }
};
