/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let prevRun = 0;
    let currRun = 1;
    let count = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            currRun++;
        } else {
            count += Math.min(prevRun, currRun);
            prevRun = currRun;
            currRun = 1;
        }
    }
    count += Math.min(prevRun, currRun);

    return count;
};
