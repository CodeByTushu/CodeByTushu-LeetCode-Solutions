/**
 * Problem: LeetCode 3505 - Minimum Operations to Make Elements Within K Subarrays Equal
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const m = sorted.length;
    const valMap = new Map();
    for (let i = 0; i < m; i++) valMap.set(sorted[i], i + 1);

    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = valMap.get(nums[i]);

    const bc = new Float64Array(m + 1);
    const bs = new Float64Array(m + 1);

    function upd(i, c, v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

    let LOG = 1;
    while ((LOG << 1) <= m) LOG <<= 1;

    const cost = new Float64Array(n - x + 1);
    let total = 0;
    const kth = Math.floor(x / 2) + 1;

    for (let i = 0; i < n; i++) {
        upd(idx[i], 1, nums[i]);
        total += nums[i];

        if (i >= x) {
            upd(idx[i - x], -1, -nums[i - x]);
            total -= nums[i - x];
        }

        if (i >= x - 1) {
            let pos = 0;
            let accSum = 0;
            let rem = kth;
            for (let pw = LOG; pw > 0; pw >>= 1) {
                const np = pos + pw;
                if (np <= m && bc[np] < rem) {
                    pos = np;
                    rem -= bc[np];
                    accSum += bs[np];
                }
            }

            const median = sorted[pos];
            const sumLow = accSum + rem * median;
            const sumUp = total - sumLow;

            cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
        }
    }

    const INF = Number.MAX_SAFE_INTEGER / 4;
    let prev = new Float64Array(n + 1);
    for (let j = 1; j <= k; j++) {
        const cur = new Float64Array(n + 1);
        cur[0] = INF;
        for (let i = 1; i <= n; i++) {
            cur[i] = cur[i - 1];
            if (i >= x && prev[i - x] < INF) {
                cur[i] = Math.min(cur[i], prev[i - x] + cost[i - x]);
            }
        }
        prev = cur;
    }

    return prev[n];
};
