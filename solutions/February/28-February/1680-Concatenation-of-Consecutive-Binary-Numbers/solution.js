/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function(n) {
    let ans = 0n;
    let bitLength = 0n;
    const MOD = 1000000007n;

    for (let i = 1n; i <= BigInt(n); i++) {
        // When i is a power of 2, its binary representation requires one more bit
        if ((i & (i - 1n)) === 0n) {
            bitLength++;
        }
        ans = ((ans << bitLength) | i) % MOD;
    }

    return Number(ans);
};
