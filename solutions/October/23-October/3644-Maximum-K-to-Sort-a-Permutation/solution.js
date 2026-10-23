/**
 * Problem: LeetCode 3644 - Maximum K to Sort a Permutation
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function(nums) {
    const n = nums.length;
    let ans = -1;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            ans &= nums[i];
        }
    }
    return ans === -1 ? 0 : ans;
};
