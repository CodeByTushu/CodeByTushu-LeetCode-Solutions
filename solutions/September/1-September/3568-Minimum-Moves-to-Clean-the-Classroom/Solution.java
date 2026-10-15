import java.util.*;

/**
 * Problem: LeetCode 3568 - Minimum Moves to Clean the Classroom
 * Language: Java (OpenJDK 17)
 * Approach: Breadth-First Search (BFS) with Bitmask State Tracking
 * Time Complexity: O(M * N * Energy * 2^L)
 * Space Complexity: O(M * N * Energy * 2^L)
 */
class Solution {
    public int minMoves(String[] classroom, int energy) {
        int m = classroom.length;
        int n = classroom[0].length();

        int startR = -1, startC = -1;
        List<int[]> litters = new ArrayList<>();
        boolean[][] isReset = new boolean[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                char c = classroom[i].charAt(j);
                if (c == 'S') {
                    startR = i;
                    startC = j;
                } else if (c == 'L') {
                    litters.add(new int[]{i, j});
                } else if (c == 'R') {
                    isReset[i][j] = true;
                }
            }
        }

        int totalLitter = litters.size();
        int fullMask = (1 << totalLitter) - 1;

        // Map litter position -> index
        Map<Integer, Integer> litterIndex = new HashMap<>();
        for (int k = 0; k < totalLitter; k++) {
            litterIndex.put(litters.get(k)[0] * n + litters.get(k)[1], k);
        }

        boolean[][][][] visited = new boolean[m][n][energy + 1][fullMask + 1];
        Queue<int[]> queue = new LinkedList<>();

        int initMask = 0;
        Integer startLitter = litterIndex.get(startR * n + startC);
        if (startLitter != null) {
            initMask |= (1 << startLitter);
        }

        queue.offer(new int[]{startR, startC, energy, initMask, 0});
        visited[startR][startC][energy][initMask] = true;

        int[] dirs = {-1, 0, 1, 0, 0, -1, 0, 1};

        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int r = cur[0], c = cur[1], e = cur[2], mask = cur[3], moves = cur[4];

            if (mask == fullMask) {
                return moves;
            }

            if (e == 0) {
                continue;
            }

            for (int d = 0; d < 4; d++) {
                int nr = r + dirs[d * 2];
                int nc = c + dirs[d * 2 + 1];

                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (classroom[nr].charAt(nc) == 'X') continue;

                int ne = e - 1;
                // If landed on reset area, restore energy
                if (isReset[nr][nc]) {
                    ne = energy;
                }

                // Collect litter if present
                int newMask = mask;
                Integer li = litterIndex.get(nr * n + nc);
                if (li != null) {
                    newMask |= (1 << li);
                }

                if (!visited[nr][nc][ne][newMask]) {
                    visited[nr][nc][ne][newMask] = true;
                    queue.offer(new int[]{nr, nc, ne, newMask, moves + 1});
                }
            }
        }

        return -1; // impossible
    }
}
