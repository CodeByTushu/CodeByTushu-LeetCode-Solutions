/**
 * Problem: LeetCode 3721 - Longest Balanced Subarray II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
class SegmentTree {
    constructor(n) {
        this.n = n;
        this.treeMin = new Int32Array(4 * n);
        this.treeMax = new Int32Array(4 * n);
        this.lazy = new Int32Array(4 * n);
        this.build(1, 0, n - 1);
    }

    build(node, start, end) {
        if (start === end) {
            this.treeMin[node] = 1000000;
            this.treeMax[node] = 1000000;
            return;
        }
        const mid = (start + end) >> 1;
        this.build(node << 1, start, mid);
        this.build((node << 1) | 1, mid + 1, end);
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    push(node) {
        if (this.lazy[node] !== 0) {
            const val = this.lazy[node];
            const left = node << 1;
            const right = (node << 1) | 1;

            this.treeMin[left] += val;
            this.treeMax[left] += val;
            this.lazy[left] += val;

            this.treeMin[right] += val;
            this.treeMax[right] += val;
            this.lazy[right] += val;

            this.lazy[node] = 0;
        }
    }

    activate(node, start, end, idx) {
        if (start === end) {
            this.treeMin[node] = 0;
            this.treeMax[node] = 0;
            return;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        if (idx <= mid) {
            this.activate(node << 1, start, mid, idx);
        } else {
            this.activate((node << 1) | 1, mid + 1, end, idx);
        }
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    update(node, start, end, l, r, val) {
        if (l <= start && end <= r) {
            this.treeMin[node] += val;
            this.treeMax[node] += val;
            this.lazy[node] += val;
            return;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        if (l <= mid) {
            this.update(node << 1, start, mid, l, r, val);
        }
        if (r > mid) {
            this.update((node << 1) | 1, mid + 1, end, l, r, val);
        }
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    findFirstZero(node, start, end, maxR) {
        if (start > maxR || this.treeMin[node] > 0 || this.treeMax[node] < 0) {
            return -1;
        }
        if (start === end) {
            return start;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        const res = this.findFirstZero(node << 1, start, mid, maxR);
        if (res !== -1) {
            return res;
        }
        return this.findFirstZero((node << 1) | 1, mid + 1, end, maxR);
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    const n = nums.length;
    const seg = new SegmentTree(n);
    const lastPos = new Int32Array(100001).fill(-1);
    let maxLen = 0;

    for (let r = 0; r < n; r++) {
        const v = nums[r];
        const w = (v % 2 === 0) ? 1 : -1;
        const prev = lastPos[v];
        lastPos[v] = r;

        seg.activate(1, 0, n - 1, r);
        seg.update(1, 0, n - 1, prev + 1, r, w);

        const firstZero = seg.findFirstZero(1, 0, n - 1, r);
        if (firstZero !== -1) {
            maxLen = Math.max(maxLen, r - firstZero + 1);
        }
    }

    return maxLen;
};
