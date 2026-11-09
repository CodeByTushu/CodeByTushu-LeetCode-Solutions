/**
 * Problem: LeetCode 1606 - Find Servers That Handled Most Number of Requests
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * MinHeap implementation for PriorityQueue operations
 */
class MinHeap {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comp = comparator;
    }
    size() { return this.heap.length; }
    peek() { return this.heap[0]; }
    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }
    pop() {
        if (this.size() === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }
    _siftUp(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.comp(this.heap[i], this.heap[p]) < 0) {
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
            if (this.comp(this.heap[left], this.heap[best]) < 0) best = left;
            if (right < n && this.comp(this.heap[right], this.heap[best]) < 0) best = right;
            if (best !== i) {
                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            } else break;
        }
    }
}

/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function(k, arrival, load) {
    const count = new Array(k).fill(0);
    const freeGe = new MinHeap(); // Available servers with ID >= (i % k)
    for (let i = 0; i < k; i++) freeGe.push(i);
    const freeLt = new MinHeap(); // Available servers with ID < (i % k)
    const busy = new MinHeap((a, b) => a[0] - b[0]); // [completionTime, serverId]

    for (let i = 0; i < arrival.length; i++) {
        const start = arrival[i];
        const duration = load[i];
        const target = i % k;

        // Wrap around when target resets to 0
        if (target === 0) {
            while (freeLt.size() > 0) freeGe.push(freeLt.pop());
        }

        // Release servers that finish at or before current request's arrival
        while (busy.size() > 0 && busy.peek()[0] <= start) {
            const [, s] = busy.pop();
            if (s >= target) freeGe.push(s);
            else freeLt.push(s);
        }

        // Move servers with ID < target to the wrapped pool
        while (freeGe.size() > 0 && freeGe.peek() < target) {
            freeLt.push(freeGe.pop());
        }

        // Assign request to the next available server >= target or wrap around
        let server = null;
        if (freeGe.size() > 0) {
            server = freeGe.pop();
        } else if (freeLt.size() > 0) {
            server = freeLt.pop();
        } else {
            continue; // All k servers busy -> request is dropped
        }

        count[server]++;
        busy.push([start + duration, server]);
    }

    let maxReq = 0;
    for (let c of count) {
        if (c > maxReq) maxReq = c;
    }

    const result = [];
    for (let i = 0; i < k; i++) {
        if (count[i] === maxReq) result.push(i);
    }
    return result;
};
