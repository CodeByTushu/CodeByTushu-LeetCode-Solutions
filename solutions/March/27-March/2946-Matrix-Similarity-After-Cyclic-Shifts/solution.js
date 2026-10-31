/**
 * Problem: LeetCode 2946 - Matrix Similarity After Cyclic Shifts
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
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
