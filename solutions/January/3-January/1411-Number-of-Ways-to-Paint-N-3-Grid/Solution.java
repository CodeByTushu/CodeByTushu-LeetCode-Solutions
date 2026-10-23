/**
 * Problem: LeetCode 1411 - Number of Ways to Paint N × 3 Grid
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int numOfWays(int n) {
        long color2 = 6; // Patterns with 2 distinct colors (e.g., ABA)
        long color3 = 6; // Patterns with 3 distinct colors (e.g., ABC)
        long mod = 1_000_000_007L;

        for (int i = 2; i <= n; i++) {
            long nextColor2 = (3 * color2 + 2 * color3) % mod;
            long nextColor3 = (2 * color2 + 2 * color3) % mod;
            color2 = nextColor2;
            color3 = nextColor3;
        }

        return (int) ((color2 + color3) % mod);
    }
}
