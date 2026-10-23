/**
 * Problem: LeetCode 3754 - Concatenate Non-Zero Digits and Multiply by Sum I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} n
 * @return {number}
 */
var sumAndMultiply = function(n) {
    if (n === 0) return 0;

    let x = 0;
    let sum = 0;

    const s = n.toString();

    for (let i = 0; i < s.length; i++) {
        if (s[i] !== '0') {
            const digit = s.charCodeAt(i) - 48;
            x = x * 10 + digit;
            sum += digit;
        }
    }

    return x * sum;
};
