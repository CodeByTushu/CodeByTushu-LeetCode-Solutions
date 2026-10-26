/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minOperations = function(s, k) {
    const n = s.length;
    let c0 = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === '0') {
            c0++;
        }
    }

    if (c0 === 0) {
        return 0;
    }

    const c1 = n - c0;
    let best = Infinity;

    // Case 1: Odd m
    if (k % 2 === c0 % 2) {
        let minM = Math.ceil(c0 / k);
        if (n === k) {
            if (c1 === 0) {
                if (minM % 2 === 0) minM++;
                best = Math.min(best, minM);
            }
        } else {
            minM = Math.max(minM, Math.ceil(c1 / (n - k)));
            if (minM % 2 === 0) minM++;
            best = Math.min(best, minM);
        }
    }

    // Case 2: Even m
    if (c0 % 2 === 0) {
        let minM = Math.max(2, Math.ceil(c0 / k));
        if (n > k) {
            minM = Math.max(minM, Math.ceil(c0 / (n - k)));
            if (minM % 2 !== 0) minM++;
            best = Math.min(best, minM);
        }
    }

    return best === Infinity ? -1 : best;
};
