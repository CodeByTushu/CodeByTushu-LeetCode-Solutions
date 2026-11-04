/**
 * Problem: LeetCode 3505 - Minimum Operations to Make Elements Within K Subarrays Equal
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
    int m;
    vector<long long> bc, bs;

    void upd(int i, int c, long long v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

public:
    long long minOperations(vector<int>& nums, int x, int k) {
        int n = nums.size();

        // Coordinate compression
        vector<int> vals = nums;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        m = vals.size();

        bc.assign(m + 1, 0);
        bs.assign(m + 1, 0);

        vector<int> idx(n);
        for (int i = 0; i < n; i++) {
            idx[i] = lower_bound(vals.begin(), vals.end(), nums[i]) - vals.begin() + 1;
        }

        int LOG = 1;
        while ((LOG << 1) <= m) LOG <<= 1;

        vector<long long> cost(n - x + 1, 0);
        long long total = 0;
        int kth = x / 2 + 1;

        for (int i = 0; i < n; i++) {
            upd(idx[i], 1, nums[i]);
            total += nums[i];

            if (i >= x) {
                upd(idx[i - x], -1, -nums[i - x]);
                total -= nums[i - x];
            }

            if (i >= x - 1) {
                int pos = 0;
                long long accSum = 0;
                int rem = kth;
                for (int pw = LOG; pw > 0; pw >>= 1) {
                    int np = pos + pw;
                    if (np <= m && bc[np] < rem) {
                        pos = np;
                        rem -= (int)bc[np];
                        accSum += bs[np];
                    }
                }
                long long median = vals[pos];
                long long sumLow = accSum + (long long)rem * median;
                long long sumUp = total - sumLow;

                cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
            }
        }

        long long INF = LLONG_MAX / 4;
        vector<long long> prev(n + 1, 0);
        for (int j = 1; j <= k; j++) {
            vector<long long> cur(n + 1, INF);
            for (int i = 1; i <= n; i++) {
                cur[i] = cur[i - 1];
                if (i >= x && prev[i - x] < INF) {
                    cur[i] = min(cur[i], prev[i - x] + cost[i - x]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
};
