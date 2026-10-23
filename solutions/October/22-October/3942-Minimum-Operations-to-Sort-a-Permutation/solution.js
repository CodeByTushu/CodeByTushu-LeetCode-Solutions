/**
 * Problem: LeetCode 3942 - Minimum Operations to Sort a Permutation
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function(nums) {
    const n = nums.length;
    let best = Infinity;

    // Check if array is cyclically ascending
    const s = nums[0];
    let asc = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== (i + s) % n) {
            asc = false;
            break;
        }
    }
    if (asc) {
        if (s === 0) return 0;
        best = Math.min(best, n - s, s + 2);
    }

    // Check if array is cyclically descending
    const c = nums[0];
    let desc = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== ((c - i) % n + n) % n) {
            desc = false;
            break;
        }
    }
    if (desc) {
        const t = (c + 1) % n;
        best = Math.min(best, Math.min(t, n - t) + 1);
    }

    return best === Infinity ? -1 : best;
};
