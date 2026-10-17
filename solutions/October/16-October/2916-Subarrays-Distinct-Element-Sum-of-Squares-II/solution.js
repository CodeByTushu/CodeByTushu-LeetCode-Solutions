/**
 * Problem: LeetCode 2916 - Subarrays Distinct Element Sum of Squares II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    const sum = new BigInt64Array(4 * n);
    const sq = new BigInt64Array(4 * n);
    const lazy = new BigInt64Array(4 * n);

    function apply(node, len, v) {
        const bigLen = BigInt(len);
        sq[node] = (sq[node] + 2n * v * sum[node] + v * v * bigLen) % MOD;
        sum[node] = (sum[node] + v * bigLen) % MOD;
        lazy[node] = (lazy[node] + v) % MOD;
    }

    function push(node, l, r) {
        if (lazy[node] !== 0n) {
            const mid = (l + r) >> 1;
            apply(node * 2, mid - l + 1, lazy[node]);
            apply(node * 2 + 1, r - mid, lazy[node]);
            lazy[node] = 0n;
        }
    }

    function update(node, l, r, ql, qr, v) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) {
            apply(node, r - l + 1, v);
            return;
        }
        push(node, l, r);
        const mid = (l + r) >> 1;
        update(node * 2, l, mid, ql, qr, v);
        update(node * 2 + 1, mid + 1, r, ql, qr, v);
        sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;
        sq[node] = (sq[node * 2] + sq[node * 2 + 1]) % MOD;
    }

    let maxVal = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    const last = new Int32Array(maxVal + 1);
    last.fill(-1);

    let ans = 0n;
    for (let j = 0; j < n; j++) {
        const x = nums[j];
        update(1, 0, n - 1, last[x] + 1, j, 1n);
        last[x] = j;
        ans = (ans + sq[1]) % MOD;
    }

    return Number(ans);
};
