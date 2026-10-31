/**
 * Problem: LeetCode 1411 - Number of Ways to Paint N × 3 Grid
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function(n) {
    const MOD = 1000000007n;
    let color2 = 6n; // Patterns with 2 distinct colors (e.g., ABA)
    let color3 = 6n; // Patterns with 3 distinct colors (e.g., ABC)

    for (let i = 2; i <= n; i++) {
        const nextColor2 = (3n * color2 + 2n * color3) % MOD;
        const nextColor3 = (2n * color2 + 2n * color3) % MOD;
        color2 = nextColor2;
        color3 = nextColor3;
    }

    return Number((color2 + color3) % MOD);
};
