/**
 * Problem: LeetCode 3650 - Minimum Cost Path with Edge Reversals
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Augmented Graph + Dijkstra's Algorithm (Min-PriorityQueue)
 * Time Complexity: O((V + E) log V)
 * Space Complexity: O(V + E)
 */

/**
 * Min-Heap implementation for Dijkstra
 */
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this._siftUp();
    }

    pop() {
        if (this.isEmpty()) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._siftDown();
        }
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _siftUp() {
        let nodeIdx = this.heap.length - 1;
        while (nodeIdx > 0) {
            const parentIdx = (nodeIdx - 1) >> 1;
            if (this.heap[nodeIdx][0] < this.heap[parentIdx][0]) {
                [this.heap[nodeIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[nodeIdx]];
                nodeIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    _siftDown() {
        let nodeIdx = 0;
        const length = this.heap.length;
        while ((nodeIdx << 1) + 1 < length) {
            let smallerChildIdx = (nodeIdx << 1) + 1;
            const rightChildIdx = smallerChildIdx + 1;
            if (rightChildIdx < length && this.heap[rightChildIdx][0] < this.heap[smallerChildIdx][0]) {
                smallerChildIdx = rightChildIdx;
            }
            if (this.heap[smallerChildIdx][0] < this.heap[nodeIdx][0]) {
                [this.heap[nodeIdx], this.heap[smallerChildIdx]] = [this.heap[smallerChildIdx], this.heap[nodeIdx]];
                nodeIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minCost = function(n, edges) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, 2 * w]);
    }

    const dist = new Array(n).fill(Infinity);
    dist[0] = 0;

    const pq = new MinPriorityQueue();
    pq.push([0, 0]); // [cost, node]

    while (!pq.isEmpty()) {
        const [d, u] = pq.pop();

        if (d > dist[u]) continue;
        if (u === n - 1) return d;

        for (const [v, weight] of graph[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push([dist[v], v]);
            }
        }
    }

    return dist[n - 1] === Infinity ? -1 : dist[n - 1];
};
