/**
 * Problem: LeetCode 3691 - Maximum Total Subarray Value II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 */

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
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
            if (this.heap[idx][0] > this.heap[parent][0]) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _siftDown(idx) {
        const length = this.heap.length;
        while (true) {
            let left = (idx << 1) + 1;
            let right = left + 1;
            let largest = idx;

            if (left < length && this.heap[left][0] > this.heap[largest][0]) {
                largest = left;
            }
            if (right < length && this.heap[right][0] > this.heap[largest][0]) {
                largest = right;
            }
            if (largest !== idx) {
                [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
                idx = largest;
            } else {
                break;
            }
        }
    }
}

class SparseTableRMQ {
    constructor(data) {
        this.n = data.length;
        this.maxLog = Math.floor(Math.log2(Math.max(this.n, 1))) + 2;

        this.fMax = Array.from({ length: this.n }, () => new Int32Array(this.maxLog));
        this.fMin = Array.from({ length: this.n }, () => new Int32Array(this.maxLog));
        this.lg = new Int32Array(this.n + 1);

        for (let i = 2; i <= this.n; i++) {
            this.lg[i] = this.lg[i >> 1] + 1;
        }

        for (let i = 0; i < this.n; i++) {
            this.fMax[i][0] = data[i];
            this.fMin[i][0] = data[i];
        }

        for (let j = 1; j < this.maxLog; j++) {
            for (let i = 0; i <= this.n - (1 << j); i++) {
                this.fMax[i][j] = Math.max(
                    this.fMax[i][j - 1],
                    this.fMax[i + (1 << (j - 1))][j - 1]
                );
                this.fMin[i][j] = Math.min(
                    this.fMin[i][j - 1],
                    this.fMin[i + (1 << (j - 1))][j - 1]
                );
            }
        }
    }

    queryMax(l, r) {
        const k = this.lg[r - l + 1];
        return Math.max(this.fMax[l][k], this.fMax[r - (1 << k) + 1][k]);
    }

    queryMin(l, r) {
        const k = this.lg[r - l + 1];
        return Math.min(this.fMin[l][k], this.fMin[r - (1 << k) + 1][k]);
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {
    const n = nums.length;
    const st = new SparseTableRMQ(nums);
    const pq = new MaxHeap();

    for (let l = 0; l < n; l++) {
        const val = st.queryMax(l, n - 1) - st.queryMin(l, n - 1);
        pq.push([val, l, n - 1]);
    }

    let ans = 0;

    for (let i = 0; i < k; i++) {
        const cur = pq.pop();
        if (!cur) break;

        const [val, l, r] = cur;
        ans += val;

        if (r > l) {
            const nextVal = st.queryMax(l, r - 1) - st.queryMin(l, r - 1);
            pq.push([nextVal, l, r - 1]);
        }
    }

    return ans;
};
