/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function(s) {
    const n = s.length;
    let diff1 = 0; // Mismatches with pattern starting with '0'
    let diff2 = 0; // Mismatches with pattern starting with '1'
    let minFlips = n;

    // Slide window of length n over virtual doubled string
    for (let i = 0; i < 2 * n; i++) {
        const curr = s[i % n];
        const target1 = (i % 2 === 0) ? '0' : '1';
        const target2 = (i % 2 === 0) ? '1' : '0';

        if (curr !== target1) diff1++;
        if (curr !== target2) diff2++;

        if (i >= n) {
            const out = s[(i - n) % n];
            const outTarget1 = ((i - n) % 2 === 0) ? '0' : '1';
            const outTarget2 = ((i - n) % 2 === 0) ? '1' : '0';

            if (out !== outTarget1) diff1--;
            if (out !== outTarget2) diff2--;
        }

        if (i >= n - 1) {
            minFlips = Math.min(minFlips, diff1, diff2);
        }
    }

    return minFlips;
};
