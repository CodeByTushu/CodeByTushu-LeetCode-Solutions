/**
 * Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minChanges = function(s) {
    let changes = 0;

    for (let i = 0; i < s.length; i += 2) {
        if (s[i] !== s[i + 1]) {
            changes++;
        }
    }

    return changes;
};
