/**
 * Problem: LeetCode 3225 - Maximum Score From Grid Operations
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumScore = function(grid) {
    const n = grid.length;
    const s = Array.from({ length: n }, () => new Float64Array(n + 1));
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            s[j][i + 1] = s[j][i] + grid[i][j];
        }
    }

    let prevPick = new Float64Array(n + 1);
    let prevSkip = new Float64Array(n + 1);

    for (let j = 1; j < n; j++) {
        const currPick = new Float64Array(n + 1);
        const currSkip = new Float64Array(n + 1);

        for (let curr = 0; curr <= n; curr++) {
            for (let prev = 0; prev <= n; prev++) {
                if (curr > prev) {
                    const score = s[j - 1][curr] - s[j - 1][prev];
                    currPick[curr] = Math.max(currPick[curr], prevSkip[prev] + score);
                    currSkip[curr] = Math.max(currSkip[curr], prevSkip[prev] + score);
                } else {
                    const score = s[j][prev] - s[j][curr];
                    currPick[curr] = Math.max(currPick[curr], prevPick[prev] + score);
                    currSkip[curr] = Math.max(currSkip[curr], prevPick[prev]);
                }
            }
        }
        prevPick = currPick;
        prevSkip = currSkip;
    }

    let ans = 0;
    for (let i = 0; i <= n; i++) {
        ans = Math.max(ans, prevPick[i]);
    }
    return ans;
};
