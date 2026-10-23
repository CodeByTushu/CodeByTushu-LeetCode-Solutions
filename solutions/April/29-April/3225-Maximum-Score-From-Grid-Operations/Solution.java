/**
 * Problem: LeetCode 3225 - Maximum Score From Grid Operations
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public long maximumScore(int[][] grid) {
        int n = grid.length;
        long[][] s = new long[n][n + 1];
        for (int j = 0; j < n; j++) {
            for (int i = 0; i < n; i++) {
                s[j][i + 1] = s[j][i] + grid[i][j];
            }
        }

        long[] prevPick = new long[n + 1];
        long[] prevSkip = new long[n + 1];

        for (int j = 1; j < n; j++) {
            long[] currPick = new long[n + 1];
            long[] currSkip = new long[n + 1];

            for (int curr = 0; curr <= n; curr++) {
                for (int prev = 0; prev <= n; prev++) {
                    if (curr > prev) {
                        long score = s[j - 1][curr] - s[j - 1][prev];
                        currPick[curr] = Math.max(currPick[curr], prevSkip[prev] + score);
                        currSkip[curr] = Math.max(currSkip[curr], prevSkip[prev] + score);
                    } else {
                        long score = s[j][prev] - s[j][curr];
                        currPick[curr] = Math.max(currPick[curr], prevPick[prev] + score);
                        currSkip[curr] = Math.max(currSkip[curr], prevPick[prev]);
                    }
                }
            }
            prevPick = currPick;
            prevSkip = currSkip;
        }

        long ans = 0;
        for (long val : prevPick) {
            ans = Math.max(ans, val);
        }
        return ans;
    }
}
