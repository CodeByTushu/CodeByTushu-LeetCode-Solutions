/**
 * Problem: LeetCode 3315 - Construct the Minimum Bitwise Array II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Bit Manipulation Approach (Trailing 1s Lowbit Clearing)
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary (excluding output array)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minBitwiseArray = function(nums) {
    const n = nums.length;
    const ans = new Array(n);

    for (let i = 0; i < n; i++) {
        const p = nums[i];
        // Even prime (2) cannot be formed by x | (x + 1) because x | (x + 1) is always odd
        if (p === 2) {
            ans[i] = -1;
        } else {
            // Find lowest set bit of (p + 1), then right shift by 1 to get highest bit in trailing 1s of p
            ans[i] = p - (((p + 1) & -(p + 1)) >> 1);
        }
    }

    return ans;
};
