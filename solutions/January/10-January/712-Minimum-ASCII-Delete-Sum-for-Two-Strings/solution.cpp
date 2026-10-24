/**
 * Problem: LeetCode 712 - Minimum ASCII Delete Sum for Two Strings
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int minimumDeleteSum(std::string s1, std::string s2) {
        int m = s1.length();
        int n = s2.length();
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

        // Base cases: cost of deleting all characters from s1 or s2
        for (int i = 1; i <= m; ++i) {
            dp[i][0] = dp[i - 1][0] + static_cast<int>(s1[i - 1]);
        }
        for (int j = 1; j <= n; ++j) {
            dp[0][j] = dp[0][j - 1] + static_cast<int>(s2[j - 1]);
        }

        // DP state transitions
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = std::min(
                        dp[i - 1][j] + static_cast<int>(s1[i - 1]),
                        dp[i][j - 1] + static_cast<int>(s2[j - 1])
                    );
                }
            }
        }

        return dp[m][n];
    }
};
