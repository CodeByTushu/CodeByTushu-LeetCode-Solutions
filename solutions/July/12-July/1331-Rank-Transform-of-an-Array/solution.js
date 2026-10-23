/**
 * Problem: LeetCode 1331 - Rank Transform of an Array
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const rank = new Map();
    let r = 1;

    for (const num of sorted) {
        if (!rank.has(num)) {
            rank.set(num, r++);
        }
    }

    return arr.map(num => rank.get(num));
};
