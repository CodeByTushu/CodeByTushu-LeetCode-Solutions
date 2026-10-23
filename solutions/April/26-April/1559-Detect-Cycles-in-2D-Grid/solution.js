/**
 * Problem: LeetCode 1559 - Detect Cycles in 2D Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

class DSU {
    constructor(n) {
        this.parent = new Int32Array(n);
        this.rank = new Int32Array(n);
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
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI === rootJ) return false; // Cycle detected

        if (this.rank[rootI] < this.rank[rootJ]) {
            this.parent[rootI] = rootJ;
        } else if (this.rank[rootI] > this.rank[rootJ]) {
            this.parent[rootJ] = rootI;
        } else {
            this.parent[rootJ] = rootI;
            this.rank[rootI]++;
        }
        return true;
    }
}

/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dsu = new DSU(m * n);

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const u = r * n + c;
            const ch = grid[r][c];

            // Check right neighbor
            if (c + 1 < n && ch === grid[r][c + 1]) {
                const v = r * n + (c + 1);
                if (!dsu.union(u, v)) {
                    return true;
                }
            }

            // Check down neighbor
            if (r + 1 < m && ch === grid[r + 1][c]) {
                const v = (r + 1) * n + c;
                if (!dsu.union(u, v)) {
                    return true;
                }
            }
        }
    }

    return false;
};
