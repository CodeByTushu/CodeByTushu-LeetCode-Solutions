/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumAmount(vector<vector<int>>& coins) {
        int m = coins.size();
        int n = coins[0].size();
        const int NEG_INF = -1e9;

        // dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
        vector<vector<vector<int>>> dp(m, vector<vector<int>>(n, vector<int>(3, NEG_INF)));

        // Base case at (0, 0)
        dp[0][0][0] = coins[0][0];
        if (coins[0][0] < 0) {
            dp[0][0][1] = 0;
            dp[0][0][2] = 0;
        } else {
            dp[0][0][1] = coins[0][0];
            dp[0][0][2] = coins[0][0];
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;

                for (int k = 0; k < 3; k++) {
                    int maxVal = NEG_INF;

                    // From top (i - 1, j)
                    if (i > 0) {
                        if (dp[i - 1][j][k] != NEG_INF) {
                            maxVal = max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] != NEG_INF) {
                            maxVal = max(maxVal, dp[i - 1][j][k - 1]);
                        }
                    }

                    // From left (i, j - 1)
                    if (j > 0) {
                        if (dp[i][j - 1][k] != NEG_INF) {
                            maxVal = max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] != NEG_INF) {
                            maxVal = max(maxVal, dp[i][j - 1][k - 1]);
                        }
                    }

                    dp[i][j][k] = maxVal;
                }
            }
        }

        return max({dp[m - 1][n - 1][0], dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]});
    }
};
