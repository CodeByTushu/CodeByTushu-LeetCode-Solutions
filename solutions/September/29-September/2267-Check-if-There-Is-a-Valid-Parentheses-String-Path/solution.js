/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length, n = grid[0].length;
    const totalLen = m + n - 1;

    // Path length must be even to form a valid balanced parentheses string
    if ((totalLen & 1) === 1) return false;
    if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') return false;

    const maxBal = Math.floor(totalLen / 2);
    // dp[i][j][b] represents whether open parenthesis balance 'b' is reachable at cell (i, j)
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Uint8Array(maxBal + 2))
    );

    dp[0][0][1] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            const delta = grid[i][j] === '(' ? 1 : -1;
            for (let b = 0; b <= maxBal; b++) {
                const prev = b - delta;
                if (prev < 0 || prev > maxBal) continue;
                let reachable = false;
                if (i > 0 && dp[i - 1][j][prev]) reachable = true;
                if (j > 0 && dp[i][j - 1][prev]) reachable = true;
                if (reachable) dp[i][j][b] = 1;
            }
        }
    }

    return dp[m - 1][n - 1][0] === 1;
};
