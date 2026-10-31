/**
 * Problem: LeetCode 3871 - Count Commas in Range II
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let result = 0n;
    const bigN = BigInt(n);
    let threshold = 1000n;

    while (threshold <= bigN) {
        result += (bigN - threshold + 1n);
        threshold *= 1000n;
    }

    return Number(result);
};
