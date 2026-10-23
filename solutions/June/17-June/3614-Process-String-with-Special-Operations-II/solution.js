/**
 * Problem: LeetCode 3614 - Process String with Special Operations II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {number} k
 * @return {character}
 */
var processStr = function(s, k) {
    const n = s.length;
    const len = new Array(n);
    let cur = 0;

    // Calculate final length after every operation
    for (let i = 0; i < n; i++) {
        const ch = s[i];

        if (ch >= 'a' && ch <= 'z') {
            cur++;
        } else if (ch === '*') {
            if (cur > 0) cur--;
        } else if (ch === '#') {
            cur = Math.min(cur * 2, 1e15 + 5);
        } else { // '%'
            // length unchanged
        }

        len[i] = cur;
    }

    if (k >= cur) {
        return '.';
    }

    // Work backwards
    for (let i = n - 1; i >= 0; i--) {
        const ch = s[i];
        const before = (i === 0) ? 0 : len[i - 1];

        if (ch >= 'a' && ch <= 'z') {
            if (k === before) {
                return ch;
            }
        } else if (ch === '*') {
            // Removed last character; existing indices stay unchanged.
        } else if (ch === '#') {
            if (before > 0 && k >= before) {
                k -= before;
            }
        } else { // '%'
            if (before > 0) {
                k = before - 1 - k;
            }
        }
    }

    return '.';
};
