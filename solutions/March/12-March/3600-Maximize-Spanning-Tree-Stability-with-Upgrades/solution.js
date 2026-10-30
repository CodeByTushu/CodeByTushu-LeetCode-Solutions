/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

class DSU {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.parent = new Int32Array(n);
        this.rank = new Int8Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
        this.components = n;
    }

    /**
     * @param {number} i
     * @return {number}
     */
    find(i) {
        let root = i;
        while (root !== this.parent[root]) {
            root = this.parent[root];
        }
        let curr = i;
        while (curr !== root) {
            let next = this.parent[curr];
            this.parent[curr] = root;
            curr = next;
        }
        return root;
    }

    /**
     * @param {number} i
     * @param {number} j
     * @return {boolean}
     */
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            this.components--;
            return true;
        }
        return false;
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStability = function(n, edges, k) {
    const mandatoryDsu = new DSU(n);
    let mandatoryCount = 0;
    let minMandatory = Infinity;

    // Validate mandatory edges
    for (let i = 0; i < edges.length; i++) {
        const [u, v, s, must] = edges[i];
        if (must === 1) {
            if (!mandatoryDsu.union(u, v)) {
                return -1; // Cycle detected in mandatory edges
            }
            mandatoryCount++;
            if (s < minMandatory) {
                minMandatory = s;
            }
        }
    }

    // Validate overall graph connectivity
    const totalDsu = new DSU(n);
    for (let i = 0; i < edges.length; i++) {
        totalDsu.union(edges[i][0], edges[i][1]);
    }
    if (totalDsu.components > 1) {
        return -1;
    }

    let low = 1;
    let high = mandatoryCount > 0 ? Math.min(200000, minMandatory) : 200000;
    let ans = -1;

    function canFormTree(target) {
        const dsu = new DSU(n);

        // 1. Mandatory edges
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 1) {
                if (s < target) return false;
                dsu.union(u, v);
            }
        }

        // 2. Cost 0 optional edges
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 0 && s >= target) {
                dsu.union(u, v);
            }
        }

        // 3. Cost 1 optional edges (up to k)
        let upgradesUsed = 0;
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 0 && s < target && 2 * s >= target) {
                if (dsu.find(u) !== dsu.find(v)) {
                    if (upgradesUsed < k) {
                        dsu.union(u, v);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components === 1;
    }

    while (low <= high) {
        const mid = (low + high) >> 1;
        if (canFormTree(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
};
