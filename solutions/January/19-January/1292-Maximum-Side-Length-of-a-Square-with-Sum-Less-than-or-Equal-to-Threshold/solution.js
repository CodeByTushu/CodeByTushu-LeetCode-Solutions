/**
 * Problem: LeetCode 1292 - Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Optimized 2D Prefix Sum + Greedy Window Expansion Approach
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */

/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
var maxSideLength = function(mat, threshold) {
    const m = mat.length;
    const n = mat[0].length;
    const pref = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));

    // Precompute 2D prefix sums
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            pref[i + 1][j + 1] = mat[i][j] + pref[i][j + 1] + pref[i + 1][j] - pref[i][j];
        }
    }

    let maxLen = 0;

    // Greedily test if a square of side (maxLen + 1) ending at (i, j) fits threshold
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i > maxLen && j > maxLen) {
                const k = maxLen + 1;
                const sum = pref[i][j] - pref[i - k][j] - pref[i][j - k] + pref[i - k][j - k];
                if (sum <= threshold) {
                    maxLen++;
                }
            }
        }
    }

    return maxLen;
};
