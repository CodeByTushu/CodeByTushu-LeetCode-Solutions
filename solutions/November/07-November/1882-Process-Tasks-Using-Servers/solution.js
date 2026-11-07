/**
 * Problem: LeetCode 1882 - Process Tasks Using Servers
 * Difficulty: Medium
 * Language: JavaScript (Node.js ES2022)
 * Author: CodeByTushu
 */

class MinHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
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

    _siftUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.compare(this.heap[idx], this.heap[parent]) < 0) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _siftDown(idx) {
        const len = this.heap.length;
        while (true) {
            let smallest = idx;
            const left = (idx << 1) + 1;
            const right = left + 1;

            if (left < len && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < len && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== idx) {
                [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
                idx = smallest;
            } else {
                break;
            }
        }
    }
}

/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    const n = servers.length;
    const m = tasks.length;

    // free: [weight, index]
    const free = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    // busy: [freeTime, weight, index]
    const busy = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    for (let i = 0; i < n; i++) {
        free.push([servers[i], i]);
    }

    const ans = new Int32Array(m);
    let t = 0;

    for (let j = 0; j < m; j++) {
        t = Math.max(t, j);

        // Release servers that are free by time t
        while (!busy.isEmpty() && busy.peek()[0] <= t) {
            const s = busy.pop();
            free.push([s[1], s[2]]);
        }

        // No free server: jump to the earliest free time
        if (free.isEmpty()) {
            t = busy.peek()[0];
            while (!busy.isEmpty() && busy.peek()[0] <= t) {
                const s = busy.pop();
                free.push([s[1], s[2]]);
            }
        }

        const best = free.pop();
        ans[j] = best[1];
        busy.push([t + tasks[j], best[0], best[1]]);
    }

    return Array.from(ans);
};
