/**
 * Problem: 2333. Minimum Sum of Squared Difference
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/minimum-sum-of-squared-difference/
 * Author: CodeByTushu
 * Date: 10-10-2026
 *
 * Approach:
 * - Compute absolute difference array diff[i] = |nums1[i] - nums2[i]|.
 * - Total reductions: k = k1 + k2.
 * - Greedily reduce largest differences using a frequency bucket array.
 * - Decrement from maxDiff down to 1, updating count[d] and count[d - 1].
 *
 * Time Complexity: O(N + M) where M = max(diff) <= 10^5.
 * Space Complexity: O(M) for frequency bucket array.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    const n = nums1.length;
    let maxDiff = 0;
    const diff = new Int32Array(n);
    let k = BigInt(k1 + k2);

    for (let i = 0; i < n; i++) {
        const d = Math.abs(nums1[i] - nums2[i]);
        diff[i] = d;
        if (d > maxDiff) {
            maxDiff = d;
        }
    }

    if (maxDiff === 0 || k === 0n) {
        let initialSum = 0n;
        for (let i = 0; i < n; i++) {
            const d = BigInt(diff[i]);
            initialSum += d * d;
        }
        return Number(initialSum);
    }

    const count = new Int32Array(maxDiff + 1);
    for (let i = 0; i < n; i++) {
        count[diff[i]]++;
    }

    for (let d = maxDiff; d > 0 && k > 0n; d--) {
        if (count[d] > 0) {
            const avail = BigInt(count[d]);
            const take = avail < k ? avail : k;
            count[d] -= Number(take);
            count[d - 1] += Number(take);
            k -= take;
        }
    }

    let minSquaredSum = 0n;
    for (let d = 1; d <= maxDiff; d++) {
        if (count[d] > 0) {
            const val = BigInt(d);
            minSquaredSum += BigInt(count[d]) * val * val;
        }
    }

    return Number(minSquaredSum);
};
