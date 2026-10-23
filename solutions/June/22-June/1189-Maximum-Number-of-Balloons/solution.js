/**
 * Problem: LeetCode 1189 - Maximum Number of Balloons
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    const freq = new Int32Array(26);

    // Count frequency of each character
    for (let i = 0; i < text.length; i++) {
        freq[text.charCodeAt(i) - 97]++;
    }

    // "balloon" -> b=1, a=1, l=2, o=2, n=1
    const b = freq['b'.charCodeAt(0) - 97];
    const a = freq['a'.charCodeAt(0) - 97];
    const l = Math.floor(freq['l'.charCodeAt(0) - 97] / 2);
    const o = Math.floor(freq['o'.charCodeAt(0) - 97] / 2);
    const n = freq['n'.charCodeAt(0) - 97];

    return Math.min(b, a, l, o, n);
};
