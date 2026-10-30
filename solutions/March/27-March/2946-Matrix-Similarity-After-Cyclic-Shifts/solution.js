/**
 * Problem: 2946. Matrix Similarity After Cyclic Shifts
 * Difficulty: Easy
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Cyclic shift left (even rows) or right (odd rows) preserves row equality
 * if and only if mat[i][j] === mat[i][(j + k) % n] for all j.
 * 
 * Reduce k modulo n and perform an early-exit comparison across all cells.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    k %= n;

    if (k === 0) {
        return true;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] !== mat[i][(j + k) % n]) {
                return false;
            }
        }
    }

    return true;
};
