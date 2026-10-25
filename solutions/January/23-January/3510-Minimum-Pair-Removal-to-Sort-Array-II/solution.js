/**
 * Problem: LeetCode 3510 - Minimum Pair Removal to Sort Array II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Optimized Doubly Linked List + PriorityQueue (Min-Heap) Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this._siftUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }
    size() {
        return this.heap.length;
    }
    _compare(a, b) {
        if (a.sum !== b.sum) {
            return a.sum < b.sum ? -1 : 1;
        }
        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
    }
    _siftUp(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this._compare(this.heap[i], this.heap[p]) < 0) {
                [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                i = p;
            } else break;
        }
    }
    _siftDown(i) {
        const n = this.heap.length;
        while ((i << 1) + 1 < n) {
            let left = (i << 1) + 1;
            let right = left + 1;
            let best = i;
            if (this._compare(this.heap[left], this.heap[best]) < 0) best = left;
            if (right < n && this._compare(this.heap[right], this.heap[best]) < 0) best = right;
            if (best !== i) {
                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            } else break;
        }
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    const val = nums.map(x => BigInt(x));
    const prev = new Int32Array(n);
    const next = new Int32Array(n);
    const deleted = new Uint8Array(n);
    const version = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        prev[i] = i - 1;
        next[i] = i + 1 < n ? i + 1 : -1;
    }

    let descents = 0;
    for (let i = 0; i < n - 1; i++) {
        if (val[i] > val[i + 1]) descents++;
    }

    if (descents === 0) return 0;

    const pq = new MinHeap();
    for (let i = 0; i < n - 1; i++) {
        pq.push({ sum: val[i] + val[i + 1], id: i, ver: 0 });
    }

    let ops = 0;
    while (descents > 0 && pq.size() > 0) {
        const top = pq.pop();
        const u = top.id;

        if (deleted[u] || top.ver !== version[u]) continue;
        const v = next[u];
        if (v === -1 || deleted[v]) continue;
        if (top.sum !== val[u] + val[v]) continue;

        const p = prev[u];
        const w = next[v];

        // Remove old descent contributions
        if (p !== -1 && val[p] > val[u]) descents--;
        if (val[u] > val[v]) descents--;
        if (w !== -1 && val[v] > val[w]) descents--;

        // Merge u and v
        val[u] = val[u] + val[v];
        deleted[v] = 1;
        next[u] = w;
        if (w !== -1) prev[w] = u;

        // Add new descent contributions
        if (p !== -1 && val[p] > val[u]) descents++;
        if (w !== -1 && val[u] > val[w]) descents++;

        version[u]++;
        ops++;

        if (descents === 0) break;

        // Push updated adjacent pairs
        if (p !== -1) {
            version[p]++;
            pq.push({ sum: val[p] + val[u], id: p, ver: version[p] });
        }
        if (w !== -1) {
            pq.push({ sum: val[u] + val[w], id: u, ver: version[u] });
        }
    }

    return ops;
};
