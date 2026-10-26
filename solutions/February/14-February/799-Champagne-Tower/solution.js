/**
 * Problem: LeetCode 799 - Champagne Tower
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function(poured, query_row, query_glass) {
    const tower = Array.from({ length: query_row + 2 }, () => new Float64Array(query_row + 2));
    tower[0][0] = poured;

    for (let r = 0; r <= query_row; r++) {
        for (let c = 0; c <= r; c++) {
            if (tower[r][c] > 1.0) {
                const overflow = (tower[r][c] - 1.0) / 2.0;
                tower[r + 1][c] += overflow;
                tower[r + 1][c + 1] += overflow;
            }
        }
    }

    return Math.min(1.0, tower[query_row][query_glass]);
};
