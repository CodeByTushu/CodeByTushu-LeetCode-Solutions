/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    const n = nums.length;
    let res = "";

    // Cantor's Diagonalization:
    // Invert the i-th character of the i-th string
    for (let i = 0; i < n; i++) {
        res += nums[i][i] === '0' ? '1' : '0';
    }

    return res;
};
