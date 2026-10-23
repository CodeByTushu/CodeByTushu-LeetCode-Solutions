/**
 * Problem: LeetCode 66 - Plus One
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    const n = digits.length;
    // Traverse digits from right to left
    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    // If all digits were 9 (e.g. 99 -> 100)
    const result = new Array(n + 1).fill(0);
    result[0] = 1;
    return result;
};
