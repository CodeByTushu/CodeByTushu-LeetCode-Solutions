/**
 * Problem: LeetCode 3525 - Find X Value of Array II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 */

class Node {
    constructor(k) {
        this.prod = 1;
        this.remain = new Int32Array(k);
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function(nums, k, queries) {
    const n = nums.length;
    const tree = new Array(4 * n);

    function merge(left, right) {
        const parent = new Node(k);
        parent.prod = (left.prod * right.prod) % k;

        // 1. Prefixes that stay completely in the left child
        for (let r = 0; r < k; r++) {
            parent.remain[r] = left.remain[r];
        }

        // 2. Prefixes that span through the left child and extend into the right child
        const leftProd = left.prod;
        for (let r = 0; r < k; r++) {
            const combined = (leftProd * r) % k;
            parent.remain[combined] += right.remain[r];
        }

        return parent;
    }

    function build(cur, left, right) {
        tree[cur] = new Node(k);
        if (left === right) {
            const val = nums[left] % k;
            tree[cur].prod = val;
            tree[cur].remain[val] = 1;
            return;
        }
        const mid = (left + right) >> 1;
        build(2 * cur + 1, left, mid);
        build(2 * cur + 2, mid + 1, right);
        tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2]);
    }

    function update(cur, lo, hi, idx, val) {
        if (lo === hi) {
            tree[cur].remain.fill(0);
            tree[cur].prod = val;
            tree[cur].remain[val] = 1;
            return;
        }
        const mid = (lo + hi) >> 1;
        if (idx <= mid) {
            update(2 * cur + 1, lo, mid, idx, val);
        } else {
            update(2 * cur + 2, mid + 1, hi, idx, val);
        }
        tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2]);
    }

    function query(cur, lo, hi, ql, qr) {
        if (ql <= lo && hi <= qr) {
            return tree[cur];
        }
        const mid = (lo + hi) >> 1;
        if (qr <= mid) {
            return query(2 * cur + 1, lo, mid, ql, qr);
        }
        if (ql > mid) {
            return query(2 * cur + 2, mid + 1, hi, ql, qr);
        }
        const leftNode = query(2 * cur + 1, lo, mid, ql, qr);
        const rightNode = query(2 * cur + 2, mid + 1, hi, ql, qr);
        return merge(leftNode, rightNode);
    }

    build(0, 0, n - 1);
    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const [index, value, start, x] = queries[i];
        update(0, 0, n - 1, index, value % k);
        const resNode = query(0, 0, n - 1, start, n - 1);
        ans[i] = resNode.remain[x];
    }

    return ans;
};
