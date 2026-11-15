/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    const MOD = 1_000_000_007;

    let odd = 0;
    let even = 1;
    let prefix = 0;
    let ans = 0;

    for (const x of arr) {
        prefix = (prefix + x) % 2;

        if (prefix === 1) {
            ans = (ans + even) % MOD;
            odd++;
        } else {
            ans = (ans + odd) % MOD;
            even++;
        }
    }

    return ans;
};
