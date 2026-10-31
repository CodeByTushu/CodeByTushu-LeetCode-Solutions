/**
 * Problem: LeetCode 1653 - Minimum Deletions to Make String Balanced
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function(s) {
    let bCount = 0;
    let deletions = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'b') {
            bCount++;
        } else {
            // Either delete this 'a' or delete all previous 'b's
            deletions = Math.min(deletions + 1, bCount);
        }
    }

    return deletions;
};
