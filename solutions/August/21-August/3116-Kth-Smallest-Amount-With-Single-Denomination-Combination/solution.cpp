#include <vector>
#include <numeric>
#include <algorithm>

class Solution {
public:
    long long findKthSmallest(std::vector<int>& coins, int k) {
        int minCoin = *std::min_element(coins.begin(), coins.end());
        long long lo = 1, hi = 1LL * k * minCoin;

        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (countUpTo(mid, coins) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }

private:
    long long countUpTo(long long x, const std::vector<int>& coins) {
        int n = coins.size();
        long long count = 0;

        for (int mask = 1; mask < (1 << n); ++mask) {
            long long lcmVal = 1;
            bool tooBig = false;

            for (int i = 0; i < n; ++i) {
                if (mask & (1 << i)) {
                    lcmVal = std::lcm(lcmVal, static_cast<long long>(coins[i]));
                    if (lcmVal > x) {
                        tooBig = true;
                        break;
                    }
                }
            }

            if (tooBig) continue;

            long long term = x / lcmVal;
            if (__builtin_popcount(mask) % 2 == 1) {
                count += term;
            } else {
                count -= term;
            }
        }

        return count;
    }
};
