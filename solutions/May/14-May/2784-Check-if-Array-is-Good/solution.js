/**
 * Problem: LeetCode 2784 - Check if Array is Good
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function(nums) {
    const n = nums.length - 1;
    if (n < 1) {
        return false;
    }

    const count = new Int32Array(n + 1);
    for (const num of nums) {
        if (num < 1 || num > n) {
            return false;
        }
        count[num]++;
    }

    // Each number from 1 to n - 1 must appear exactly once
    for (let i = 1; i < n; i++) {
        if (count[i] !== 1) {
            return false;
        }
    }

    // The number n must appear exactly twice
    return count[n] === 2;
};
