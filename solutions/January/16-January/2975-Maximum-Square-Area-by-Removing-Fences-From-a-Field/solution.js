/**
 * Problem: LeetCode 2975 - Maximum Square Area by Removing Fences From a Field
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function(m, n, hFences, vFences) {
    const MOD = 1000000007n;

    // Add boundary fences and sort
    const h = [...hFences, 1, m].sort((a, b) => a - b);
    const v = [...vFences, 1, n].sort((a, b) => a - b);

    // Compute all possible horizontal differences
    const hDiffs = new Set();
    for (let i = 0; i < h.length; i++) {
        for (let j = i + 1; j < h.length; j++) {
            hDiffs.add(h[j] - h[i]);
        }
    }

    // Find the maximum side length common to both dimensions
    let maxSide = -1n;
    for (let i = 0; i < v.length; i++) {
        for (let j = i + 1; j < v.length; j++) {
            const diff = v[j] - v[i];
            if (hDiffs.has(diff)) {
                const diffBig = BigInt(diff);
                if (diffBig > maxSide) {
                    maxSide = diffBig;
                }
            }
        }
    }

    if (maxSide === -1n) {
        return -1;
    }

    return Number((maxSide * maxSide) % MOD);
};
