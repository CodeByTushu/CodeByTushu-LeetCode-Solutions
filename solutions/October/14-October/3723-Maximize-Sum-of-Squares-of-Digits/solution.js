/**
 * Problem: LeetCode 3723 - Maximize Sum of Squares of Digits
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function(num, sum) {
    if (sum > 9 * num) return "";
    const nines = Math.floor(sum / 9);
    const rem = sum % 9;
    const zeros = num - nines - (rem > 0 ? 1 : 0);
    
    if (rem > 0) {
        return "9".repeat(nines) + rem.toString() + "0".repeat(zeros);
    }
    return "9".repeat(nines) + "0".repeat(zeros);
};
