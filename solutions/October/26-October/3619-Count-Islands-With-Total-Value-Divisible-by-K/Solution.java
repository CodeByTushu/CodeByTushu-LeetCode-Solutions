/**
 * Problem: LeetCode 3619 - Count Islands With Total Value Divisible by K
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countIslands(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        int count = 0;
        int[] stack = new int[m * n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) continue;
                long sum = 0;
                int top = 0;
                stack[top++] = i * n + j;
                sum += grid[i][j];
                grid[i][j] = 0;
                while (top > 0) {
                    int cur = stack[--top];
                    int r = cur / n, c = cur % n;
                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 0) continue;

                        sum += grid[nr][nc];
                        grid[nr][nc] = 0;
                        stack[top++] = nr * n + nc;
                    }
                }
                if (sum % k == 0) count++;
            }
        }
        return count;
    }
}
