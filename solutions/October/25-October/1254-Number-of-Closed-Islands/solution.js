/**
 * Problem: LeetCode 1254 - Number of Closed Islands
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    const m = grid.length, n = grid[0].length;

    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 1) {
            return;
        }
        grid[i][j] = 1;
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    for (let i = 0; i < m; i++) {
        if (grid[i][0] === 0) dfs(i, 0);
        if (grid[i][n - 1] === 0) dfs(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        if (grid[0][j] === 0) dfs(0, j);
        if (grid[m - 1][j] === 0) dfs(m - 1, j);
    }

    let count = 0;
    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (grid[i][j] === 0) {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
};
