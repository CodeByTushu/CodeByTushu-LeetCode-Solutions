/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;

        // f[i] = kitne items j (j != i) ke factor ko factor_i divide karta hai
        // (item i ek baar kharidne par itni free copies milengi)
        int[] f = new int[n];
        int minPrice = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            minPrice = Math.min(minPrice, items[i][1]);
            for (int j = 0; j < n; j++) {
                if (i != j && items[j][0] % items[i][0] == 0) {
                    f[i]++;
                }
            }
        }

        // dp[b] = max copies jo cost <= b mein mil sakti hain
        int[] dp = new int[budget + 1];

        // Step 1: har item ki pehli copy (0/1 knapsack), value = 1 (khud) + f[i] (free copies)
        for (int i = 0; i < n; i++) {
            int price = items[i][1];
            int value = 1 + f[i];
            for (int b = budget; b >= price; b--) {
                dp[b] = Math.max(dp[b], dp[b - price] + value);
            }
        }

        // Step 2: extra copies sabse sasta item kharid ke (unbounded), har copy ki value = 1
        for (int b = minPrice; b <= budget; b++) {
            dp[b] = Math.max(dp[b], dp[b - minPrice] + 1);
        }

        return dp[budget];
    }
}
