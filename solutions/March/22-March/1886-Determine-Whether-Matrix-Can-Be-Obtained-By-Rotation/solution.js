/**
 * Problem: LeetCode 1886 - Determine Whether Matrix Can Be Obtained By Rotation
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
var findRotation = function(mat, target) {
    const n = mat.length;
    let r0 = true, r90 = true, r180 = true, r270 = true;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] !== target[i][j]) r0 = false;
            if (mat[i][j] !== target[j][n - 1 - i]) r90 = false;
            if (mat[i][j] !== target[n - 1 - i][n - 1 - j]) r180 = false;
            if (mat[i][j] !== target[n - 1 - j][i]) r270 = false;
        }
    }

    return r0 || r90 || r180 || r270;
};
