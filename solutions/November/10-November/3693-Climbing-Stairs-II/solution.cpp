/**
 * Problem: LeetCode 3693 - Climbing Stairs II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int climbStairs(int n, std::vector<int>& costs) {
        std::vector<int> dp(n + 1, 0);

        for (int j = 1; j <= n; ++j) {
            int best = INT_MAX;
            // Jump from j-1, j-2, or j-3 (only if valid step >= 0)
            for (int d = 1; d <= 3 && j - d >= 0; ++d) {
                best = std::min(best, dp[j - d] + costs[j - 1] + d * d);
            }
            dp[j] = best;
        }

        return dp[n];
    }
};
