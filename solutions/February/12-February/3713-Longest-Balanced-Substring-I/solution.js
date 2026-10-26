/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    const n = s.length;
    let maxLen = 0;
    const freq = new Int32Array(26);

    for (let i = 0; i < n; i++) {
        if (n - i <= maxLen) {
            break;
        }
        freq.fill(0);
        let distinct = 0;
        let maxFreq = 0;

        for (let j = i; j < n; j++) {
            const c = s.charCodeAt(j) - 97;
            if (freq[c] === 0) {
                distinct++;
            }
            freq[c]++;
            if (freq[c] > maxFreq) {
                maxFreq = freq[c];
            }

            const len = j - i + 1;
            if (len === distinct * maxFreq) {
                if (len > maxLen) {
                    maxLen = len;
                }
            }
        }
    }

    return maxLen;
};
