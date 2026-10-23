#include <vector>

/**
 * Problem: LeetCode 2267 - Check if There Is a Valid Parentheses String Path
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool hasValidPath(std::vector<std::vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int totalLen = m + n - 1;

        // Path length must be even to form a valid balanced parentheses string
        if ((totalLen & 1) == 1) return false;
        if (grid[0][0] == ')' || grid[m - 1][n - 1] == '(') return false;

        int maxBal = totalLen / 2;
        // dp[i][j][b] represents if open parenthesis balance 'b' is reachable at cell (i, j)
        std::vector<std::vector<std::vector<bool>>> dp(
            m, std::vector<std::vector<bool>>(n, std::vector<bool>(maxBal + 2, false))
        );

        dp[0][0][1] = true;

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 && j == 0) continue;
                int delta = (grid[i][j] == '(') ? 1 : -1;
                for (int b = 0; b <= maxBal; ++b) {
                    int prev = b - delta;
                    if (prev < 0 || prev > maxBal) continue;
                    bool reachable = false;
                    if (i > 0 && dp[i - 1][j][prev]) reachable = true;
                    if (j > 0 && dp[i][j - 1][prev]) reachable = true;
                    if (reachable) dp[i][j][b] = true;
                }
            }
        }

        return dp[m - 1][n - 1][0];
    }
};
