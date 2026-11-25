/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function(nums) {
    const n = nums.length;
    const MOD = (1n << 61n) - 1n;
    const base = 1000003n + BigInt(Math.floor(Math.random() * 1000000));

    const h = new BigUint64Array(n + 1);
    const pw = new BigUint64Array(n + 1);
    pw[0] = 1n;

    for (let i = 0; i < n; i++) {
        h[i + 1] = (h[i] * base + BigInt(nums[i])) % MOD;
        pw[i + 1] = (pw[i] * base) % MOD;
    }

    const hasUnique = (L) => {
        const m = n - L + 1;
        const pwL = pw[L];
        const arr = new BigUint64Array(m);
        for (let i = 0; i < m; i++) {
            let v = (h[i + L] - ((h[i] * pwL) % MOD)) % MOD;
            if (v < 0n) v += MOD;
            arr[i] = v;
        }
        arr.sort();

        for (let i = 0; i < m; i++) {
            const sameLeft = i > 0 && arr[i] === arr[i - 1];
            const sameRight = i < m - 1 && arr[i] === arr[i + 1];
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    };

    let lo = 1, hi = n;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (hasUnique(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
