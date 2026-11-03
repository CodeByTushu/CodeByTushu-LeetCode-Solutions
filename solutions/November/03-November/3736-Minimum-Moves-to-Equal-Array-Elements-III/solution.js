/**
 * Problem: LeetCode 3736 - Minimum Moves to Equal Array Elements III
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }

    let moves = 0;
    for (let i = 0; i < nums.length; i++) {
        moves += max - nums[i];
    }

    return moves;
};
