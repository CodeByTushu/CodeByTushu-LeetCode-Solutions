/**
 * Problem: LeetCode 3014 - Minimum Number of Pushes to Type Word I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const n = word.length;
    let totalCost = 0;
    for (let i = 0; i < n; i++) {
        totalCost += Math.floor(i / 8) + 1;
    }
    return totalCost;
};
