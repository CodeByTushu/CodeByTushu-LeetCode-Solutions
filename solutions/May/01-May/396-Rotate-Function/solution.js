/**
 * Problem: LeetCode 396 - Rotate Function
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function(nums) {
    const n = nums.length;
    let totalSum = 0;
    let currentF = 0;

    for (let i = 0; i < n; i++) {
        totalSum += nums[i];
        currentF += i * nums[i];
    }

    let maxF = currentF;

    for (let k = 1; k < n; k++) {
        currentF += totalSum - n * nums[n - k];
        if (currentF > maxF) {
            maxF = currentF;
        }
    }

    return maxF;
};
