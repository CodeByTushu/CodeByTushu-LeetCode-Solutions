#include <vector>
#include <algorithm>

class Solution {
    struct Interval {
        int l, r, w, id;
    };

    bool isLess(const std::vector<int>& a, const std::vector<int>& b) {
        if (b.empty()) return true;
        if (a.empty()) return false;
        return a < b;
    }

public:
    std::vector<int> maximumWeight(std::vector<std::vector<int>>& intervals) {
        int n = intervals.size();
        std::vector<Interval> arr(n);
        for (int i = 0; i < n; i++) {
            arr[i] = {intervals[i][0], intervals[i][1], intervals[i][2], i};
        }

        std::sort(arr.begin(), arr.end(), [](const Interval& a, const Interval& b) {
            if (a.r != b.r) return a.r < b.r;
            if (a.l != b.l) return a.l < b.l;
            if (a.w != b.w) return a.w < b.w;
            return a.id < b.id;
        });

        std::vector<int> r_list(n);
        for (int i = 0; i < n; i++) {
            r_list[i] = arr[i].r;
        }

        // posScore[i + 1][k]: best weight using k intervals from first i
        std::vector<std::vector<long long>> posScore(n + 1, std::vector<long long>(5, -1));
        std::vector<std::vector<std::vector<int>>> posIdx(n + 1, std::vector<std::vector<int>>(5));

        for (int i = 0; i < n; i++) {
            // Find rightmost j < i where arr[j].r < arr[i].l
            int p = std::lower_bound(r_list.begin(), r_list.begin() + i, arr[i].l) - r_list.begin();

            for (int k = 1; k <= 4; k++) {
                // Option 1: Do not pick interval i
                posScore[i + 1][k] = posScore[i][k];
                posIdx[i + 1][k] = posIdx[i][k];

                // Option 2: Pick interval i
                long long prevS = (k == 1) ? 0 : posScore[p][k - 1];
                if (k == 1 || prevS >= 0) {
                    long long newScore = prevS + arr[i].w;
                    std::vector<int> newIdx;
                    if (k > 1) {
                        newIdx = posIdx[p][k - 1];
                    }
                    newIdx.push_back(arr[i].id);
                    std::sort(newIdx.begin(), newIdx.end());

                    if (posScore[i + 1][k] < newScore ||
                       (posScore[i + 1][k] == newScore && (posIdx[i + 1][k].empty() || newIdx < posIdx[i + 1][k]))) {
                        posScore[i + 1][k] = newScore;
                        posIdx[i + 1][k] = newIdx;
                    }
                }
            }
        }

        long long best = -1;
        std::vector<int> ans;
        for (int k = 1; k <= 4; k++) {
            long long s = posScore[n][k];
            if (s < 0) continue;
            if (s > best || (s == best && (ans.empty() || posIdx[n][k] < ans))) {
                best = s;
                ans = posIdx[n][k];
            }
        }

        return ans;
    }
};
