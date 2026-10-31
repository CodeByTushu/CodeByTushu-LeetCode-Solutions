import java.util.HashSet;
import java.util.Set;

/**
 * Problem: LeetCode 874 - Walking Robot Simulation
 * Language: Java
 * Time Complexity: O(C * K + M)
 * Space Complexity: O(M)
 */
class Solution {
    public int robotSim(int[] commands, int[][] obstacles) {
        Set<Long> obstacleSet = new HashSet<>(obstacles.length);
        for (int[] obs : obstacles) {
            long key = (((long) obs[0]) << 32) | (obs[1] & 0xFFFFFFFFL);
            obstacleSet.add(key);
        }

        // Direction vectors: 0: North, 1: East, 2: South, 3: West
        int[] dx = {0, 1, 0, -1};
        int[] dy = {1, 0, -1, 0};
        int d = 0;

        int x = 0;
        int y = 0;
        int maxDistSq = 0;

        for (int cmd : commands) {
            if (cmd == -1) {
                // Turn right 90 degrees
                d = (d + 1) % 4;
            } else if (cmd == -2) {
                // Turn left 90 degrees
                d = (d + 3) % 4;
            } else {
                // Move forward cmd units
                for (int step = 0; step < cmd; step++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    long nextKey = (((long) nx) << 32) | (ny & 0xFFFFFFFFL);
                    if (obstacleSet.contains(nextKey)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    maxDistSq = Math.max(maxDistSq, x * x + y * y);
                }
            }
        }

        return maxDistSq;
    }
}
