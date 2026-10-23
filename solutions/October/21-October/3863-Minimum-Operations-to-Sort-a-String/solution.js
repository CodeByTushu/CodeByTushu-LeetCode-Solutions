/**
 * Problem: LeetCode 3863 - Minimum Operations to Sort a String
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    const n = s.length;
    let sorted = true;
    for (let i = 1; i < n; i++) {
        if (s.charCodeAt(i - 1) > s.charCodeAt(i)) {
            sorted = false;
            break;
        }
    }
    if (sorted) return 0;
    if (n === 2) return -1;

    let mn = 'z', mx = 'a';
    for (let i = 0; i < n; i++) {
        const c = s[i];
        if (c < mn) mn = c;
        if (c > mx) mx = c;
    }

    if (s[0] === mn || s[n - 1] === mx) return 1;

    let minPrefix = 'z', maxSuffix = 'a';
    for (let i = 0; i < n - 1; i++) {
        if (s[i] < minPrefix) minPrefix = s[i];
    }
    for (let i = 1; i < n; i++) {
        if (s[i] > maxSuffix) maxSuffix = s[i];
    }

    const lastStrictMin = s[n - 1] < minPrefix;
    const firstStrictMax = s[0] > maxSuffix;

    if (lastStrictMin && firstStrictMax) return 3;
    return 2;
};
