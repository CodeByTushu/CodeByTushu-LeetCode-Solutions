/**
 * Problem: LeetCode 2463 - Minimum Total Distance Traveled
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class Solution {
    public long minimumTotalDistance(List<Integer> robot, int[][] factory) {
        Collections.sort(robot);
        Arrays.sort(factory, (a, b) -> Integer.compare(a[0], b[0]));

        int n = robot.size();
        int m = factory.length;
        long INF = (long) 1e16;

        long[] dp = new long[n + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;

        for (int j = 0; j < m; j++) {
            long pos = factory[j][0];
            int limit = factory[j][1];
            long[] nextDp = Arrays.copyOf(dp, n + 1);

            for (int i = 1; i <= n; i++) {
                long cost = 0;
                for (int k = 1; k <= Math.min(i, limit); k++) {
                    cost += Math.abs(robot.get(i - k) - pos);
                    if (dp[i - k] != INF) {
                        nextDp[i] = Math.min(nextDp[i], dp[i - k] + cost);
                    }
                }
            }
            dp = nextDp;
        }

        return dp[n];
    }
}
