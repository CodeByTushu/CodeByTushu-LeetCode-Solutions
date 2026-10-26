/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {
    const target = 1 << k;
    if (s.length - k + 1 < target) {
        return false;
    }

    const seen = new Uint8Array(target);
    let count = 0;
    let hashVal = 0;
    const mask = target - 1;

    for (let i = 0; i < s.length; i++) {
        hashVal = ((hashVal << 1) & mask) | (s.charCodeAt(i) - 48);
        if (i >= k - 1) {
            if (seen[hashVal] === 0) {
                seen[hashVal] = 1;
                count++;
                if (count === target) {
                    return true;
                }
            }
        }
    }

    return count === target;
};
