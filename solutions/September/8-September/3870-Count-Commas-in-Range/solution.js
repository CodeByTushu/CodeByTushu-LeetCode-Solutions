/**
 * Problem: LeetCode 3870 - Count Commas in Range
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let result = 0;
    let threshold = 1000;
    while (threshold <= n) {
        result += (n - threshold + 1);
        threshold *= 1000;
    }
    return result;
};
