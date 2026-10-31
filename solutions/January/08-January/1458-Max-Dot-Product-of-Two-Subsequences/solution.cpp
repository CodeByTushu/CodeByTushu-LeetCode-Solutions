/**
 * Problem: LeetCode 1458 - Max Dot Product of Two Subsequences
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int m = nums2.size();
        const int NEG_INF = -1e8;
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, NEG_INF));

        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                int prod = nums1[i - 1] * nums2[j - 1];
                int takeBoth = prod + max(0, dp[i - 1][j - 1]);
                dp[i][j] = max({takeBoth, dp[i - 1][j], dp[i][j - 1]});
            }
        }

        return dp[n][m];
    }
};
