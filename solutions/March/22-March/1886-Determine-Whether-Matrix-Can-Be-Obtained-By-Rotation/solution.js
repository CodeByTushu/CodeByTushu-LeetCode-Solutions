/**
 * Problem: 1886. Determine Whether Matrix Can Be Obtained By Rotation
 * Difficulty: Easy
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Maintain 4 boolean flags for 0, 90, 180, and 270 degrees clockwise rotation.
 * In a single pass through the n x n matrix, invalidate flags whenever an element
 * mismatch occurs with the respective rotated target cell.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
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
