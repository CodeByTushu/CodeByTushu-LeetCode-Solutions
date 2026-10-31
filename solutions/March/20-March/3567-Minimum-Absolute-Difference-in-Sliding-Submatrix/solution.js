/**
 * Problem: LeetCode 3567 - Minimum Absolute Difference in Sliding Submatrix
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const rows = m - k + 1;
    const cols = n - k + 1;
    const ans = Array.from({ length: rows }, () => new Array(cols).fill(0));
    const window = new Int32Array(k * k);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let idx = 0;
            for (let r = 0; r < k; r++) {
                for (let c = 0; c < k; c++) {
                    window[idx++] = grid[i + r][j + c];
                }
            }

            window.sort();
            let minDiff = Infinity;

            for (let p = 1; p < window.length; p++) {
                if (window[p] !== window[p - 1]) {
                    const diff = window[p] - window[p - 1];
                    if (diff < minDiff) {
                        minDiff = diff;
                    }
                }
            }

            ans[i][j] = minDiff === Infinity ? 0 : minDiff;
        }
    }

    return ans;
};
