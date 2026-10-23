/**
 * Problem: LeetCode 3499 - Maximize Active Section with Trade I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var maxActiveSectionsAfterTrade = function(s) {
    const n = s.length;
    let ones = 0;
    let maxMerge = 0;
    let prevZeroBlock = -Infinity;
    let i = 0;

    while (i < n) {
        let j = i;
        while (j < n && s[j] === s[i]) {
            j++;
        }
        const len = j - i;
        if (s[i] === '1') {
            ones += len;
        } else {
            maxMerge = Math.max(maxMerge, prevZeroBlock + len);
            prevZeroBlock = len;
        }
        i = j;
    }

    return ones + maxMerge;
};
