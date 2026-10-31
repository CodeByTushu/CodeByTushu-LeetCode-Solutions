import java.util.Arrays;

class Solution {
    public int minimumDistance(String word) {
        int[] dp = new int[27];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[26] = 0;

        for (int i = 1; i < word.length(); i++) {
            int curr = word.charAt(i) - 'A';
            int prev = word.charAt(i - 1) - 'A';
            int[] nextDp = new int[27];
            Arrays.fill(nextDp, Integer.MAX_VALUE);

            for (int j = 0; j < 27; j++) {
                if (dp[j] == Integer.MAX_VALUE) continue;

                // Case 1: finger at prev moves to curr, other finger remains at j
                int cost1 = dp[j] + dist(prev, curr);
                nextDp[j] = Math.min(nextDp[j], cost1);

                // Case 2: finger at j moves to curr, finger at prev becomes other finger
                int cost2 = dp[j] + dist(j, curr);
                nextDp[prev] = Math.min(nextDp[prev], cost2);
            }

            dp = nextDp;
        }

        int minCost = Integer.MAX_VALUE;
        for (int cost : dp) {
            minCost = Math.min(minCost, cost);
        }
        return minCost;
    }

    private int dist(int a, int b) {
        if (a == 26 || b == 26) return 0;
        int r1 = a / 6, c1 = a % 6;
        int r2 = b / 6, c2 = b % 6;
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    }
}
