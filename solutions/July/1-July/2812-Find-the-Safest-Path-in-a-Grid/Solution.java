import java.util.*;

class Solution {
    private int n;
    private int[][] dist;
    private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

    public int maximumSafenessFactor(List<List<Integer>> grid) {
        n = grid.size();
        dist = new int[n][n];

        for (int[] row : dist) Arrays.fill(row, -1);

        Queue<int[]> q = new LinkedList<>();

        // Multi-source BFS from all thieves
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid.get(i).get(j) == 1) {
                    dist[i][j] = 0;
                    q.offer(new int[]{i, j});
                }
            }
        }

        while (!q.isEmpty()) {
            int[] cur = q.poll();

            for (int[] d : dirs) {
                int x = cur[0] + d[0];
                int y = cur[1] + d[1];

                if (x >= 0 && x < n && y >= 0 && y < n && dist[x][y] == -1) {
                    dist[x][y] = dist[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{x, y});
                }
            }
        }

        int low = 0, high = 2 * n;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (canReach(mid)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return high;
    }

    private boolean canReach(int limit) {
        if (dist[0][0] < limit) return false;

        boolean[][] vis = new boolean[n][n];
        Queue<int[]> q = new LinkedList<>();

        q.offer(new int[]{0, 0});
        vis[0][0] = true;

        while (!q.isEmpty()) {
            int[] cur = q.poll();

            if (cur[0] == n - 1 && cur[1] == n - 1) return true;

            for (int[] d : dirs) {
                int x = cur[0] + d[0];
                int y = cur[1] + d[1];

                if (x >= 0 && x < n && y >= 0 && y < n &&
                    !vis[x][y] && dist[x][y] >= limit) {

                    vis[x][y] = true;
                    q.offer(new int[]{x, y});
                }
            }
        }

        return false;
    }
}
