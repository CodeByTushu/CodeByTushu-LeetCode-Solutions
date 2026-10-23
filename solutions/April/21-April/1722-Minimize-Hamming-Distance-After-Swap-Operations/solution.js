/**
 * Problem: LeetCode 1722 - Minimize Hamming Distance After Swap Operations
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
        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
        }
    }
}

/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function(source, target, allowedSwaps) {
    const n = source.length;
    const dsu = new DSU(n);

    for (let i = 0; i < allowedSwaps.length; i++) {
        dsu.union(allowedSwaps[i][0], allowedSwaps[i][1]);
    }

    // Map: root -> Map<value, count>
    const componentCounts = new Map();
    for (let i = 0; i < n; i++) {
        const root = dsu.find(i);
        let map = componentCounts.get(root);
        if (!map) {
            map = new Map();
            componentCounts.set(root, map);
        }
        map.set(source[i], (map.get(source[i]) || 0) + 1);
    }

    let hammingDistance = 0;
    for (let i = 0; i < n; i++) {
        const root = dsu.find(i);
        const map = componentCounts.get(root);
        const val = target[i];
        const count = map.get(val) || 0;
        if (count > 0) {
            map.set(val, count - 1);
        } else {
            hammingDistance++;
        }
    }

    return hammingDistance;
};
