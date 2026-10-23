/**
 * Problem: LeetCode 2267 - Check if There Is a Valid Parentheses String Path
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean hasValidPath(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        if (((m + n - 1) & 1) == 1) return false;
        if (grid[0][0] == ')' || grid[m - 1][n - 1] == '(') return false;
        int maxBal = (m + n - 1) / 2;
        boolean[][][] dp = new boolean[m][n][maxBal + 2];
        dp[0][0][1] = true;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                int delta = grid[i][j] == '(' ? 1 : -1;
                for (int b = 0; b <= maxBal; b++) {
                    int prev = b - delta;
                    if (prev < 0 || prev > maxBal) continue;
                    boolean reachable = false;
                    if (i > 0 && dp[i - 1][j][prev]) reachable = true;
                    if (j > 0 && dp[i][j - 1][prev]) reachable = true;
                    if (reachable) dp[i][j][b] = true;
                }
            }
        }
        return dp[m - 1][n - 1][0];
    }
}
