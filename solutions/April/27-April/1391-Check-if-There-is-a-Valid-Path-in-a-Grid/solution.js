/**
 * Problem: LeetCode 1391 - Check if There is a Valid Path in a Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

class DSU {
    constructor(n) {
        this.parent = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }

    find(i) {
        if (this.parent[i] === i) return i;
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
        }
    }
}

/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dsu = new DSU(m * n);

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const val = grid[r][c];

            // Check right neighbor
            if (c + 1 < n) {
                const rightVal = grid[r][c + 1];
                const canGoRight = (val === 1 || val === 4 || val === 6);
                const canReceiveLeft = (rightVal === 1 || rightVal === 3 || rightVal === 5);
                if (canGoRight && canReceiveLeft) {
                    dsu.union(r * n + c, r * n + (c + 1));
                }
            }

            // Check down neighbor
            if (r + 1 < m) {
                const downVal = grid[r + 1][c];
                const canGoDown = (val === 2 || val === 3 || val === 4);
                const canReceiveUp = (downVal === 2 || downVal === 5 || downVal === 6);
                if (canGoDown && canReceiveUp) {
                    dsu.union(r * n + c, (r + 1) * n + c);
                }
            }
        }
    }

    return dsu.find(0) === dsu.find(m * n - 1);
};
