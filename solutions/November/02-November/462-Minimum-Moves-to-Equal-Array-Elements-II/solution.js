/**
 * Problem: LeetCode 462 - Minimum Moves to Equal Array Elements II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);
    const median = nums[Math.floor(nums.length / 2)];
    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        moves += Math.abs(nums[i] - median);
    }
    return moves;
};
