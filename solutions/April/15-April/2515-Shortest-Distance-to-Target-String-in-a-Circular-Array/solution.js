/**
 * Problem: LeetCode 2515 - Shortest Distance to Target String in a Circular Array
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closestTarget = function(words, target, startIndex) {
    const n = words.length;
    let minDistance = Infinity;

    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            const direct = Math.abs(i - startIndex);
            const circular = n - direct;
            minDistance = Math.min(minDistance, Math.min(direct, circular));
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};
