/**
 * Problem: LeetCode 3619 - Count Islands With Total Value Divisible by K
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countIslands = function(grid, k) {
    const m = grid.length, n = grid[0].length;
    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];
    let count = 0;
    const stack = new Int32Array(m * n);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) continue;

            let sum = grid[i][j];
            let top = 0;
            stack[top++] = i * n + j;
            grid[i][j] = 0;

            while (top > 0) {
                const cur = stack[--top];
                const r = Math.floor(cur / n);
                const c = cur % n;

                for (let d = 0; d < 4; d++) {
                    const nr = r + dr[d];
                    const nc = c + dc[d];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] === 0) continue;

                    sum += grid[nr][nc];
                    grid[nr][nc] = 0;
                    stack[top++] = nr * n + nc;
                }
            }

            if (sum % k === 0) {
                count++;
            }
        }
    }

    return count;
};
