/**
 * Problem: LeetCode 1833 - Maximum Ice Cream Bars
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxIceCream(int[] costs, int coins) {

        // Maximum possible cost is 100000
        int[] freq = new int[100001];

        // Count frequencies
        for (int cost : costs) {
            freq[cost]++;
        }

        int ans = 0;

        // Buy cheapest ice creams first
        for (int cost = 1; cost <= 100000; cost++) {
            if (freq[cost] == 0) continue;

            int canBuy = Math.min(freq[cost], coins / cost);

            ans += canBuy;
            coins -= canBuy * cost;

            if (coins < cost) {
                // Can't afford any more at this cost or higher
                continue;
            }
        }

        return ans;
    }
}
