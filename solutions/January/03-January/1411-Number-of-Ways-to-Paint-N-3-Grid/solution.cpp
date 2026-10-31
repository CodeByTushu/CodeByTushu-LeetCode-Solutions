/**
 * Problem: LeetCode 1411 - Number of Ways to Paint N × 3 Grid
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

class Solution {
public:
    int numOfWays(int n) {
        long long color2 = 6; // Patterns with 2 distinct colors (e.g., ABA)
        long long color3 = 6; // Patterns with 3 distinct colors (e.g., ABC)
        const int MOD = 1e9 + 7;

        for (int i = 2; i <= n; i++) {
            long long nextColor2 = (3 * color2 + 2 * color3) % MOD;
            long long nextColor3 = (2 * color2 + 2 * color3) % MOD;
            color2 = nextColor2;
            color3 = nextColor3;
        }

        return (color2 + color3) % MOD;
    }
};
