import java.util.*;

/**
 * Problem: LeetCode 3286 - Find a Safe Walk Through a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean findSafeWalk(List<List<Integer>> grid, int health) {
        int m = grid.size(), n = grid.get(0).size();

        int[][] best = new int[m][n];
        for (int[] row : best) Arrays.fill(row, -1);

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[2] - a[2]);

        int startHealth = health - grid.get(0).get(0);
        if (startHealth <= 0) return false;

        best[0][0] = startHealth;
        pq.offer(new int[]{0, 0, startHealth});

        int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int x = cur[0], y = cur[1], h = cur[2];

            if (h != best[x][y]) continue;

            if (x == m - 1 && y == n - 1) return true;

            for (int[] d : dir) {
                int nx = x + d[0];
                int ny = y + d[1];

                if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;

                int nh = h - grid.get(nx).get(ny);

                if (nh > 0 && nh > best[nx][ny]) {
                    best[nx][ny] = nh;
                    pq.offer(new int[]{nx, ny, nh});
                }
            }
        }

        return false;
    }
}
