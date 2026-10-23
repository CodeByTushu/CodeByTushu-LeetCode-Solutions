/**
 * Problem: LeetCode 3514 - Number of Unique XOR Triplets II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int uniqueXorTriplets(int[] nums) {
        final int MAX = 2048;

        boolean[][] dp = new boolean[4][MAX];
        dp[0][0] = true;

        for (int x : nums) {
            boolean[][] next = new boolean[4][MAX];

            for (int k = 0; k <= 3; k++) {
                System.arraycopy(dp[k], 0, next[k], 0, MAX);
            }

            // Use the current index up to 3 times (i <= j <= k allows repeats)
            for (int t = 0; t < 3; t++) {
                for (int k = 2; k >= 0; k--) {
                    for (int v = 0; v < MAX; v++) {
                        if (next[k][v]) {
                            next[k + 1][v ^ x] = true;
                        }
                    }
                }
            }

            dp = next;
        }

        int ans = 0;
        for (boolean ok : dp[3]) {
            if (ok) ans++;
        }

        return ans;
    }
}
