/**
 * Problem: LeetCode 2574 - Left and Right Sum Differences
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function(nums) {
    const n = nums.length;
    const answer = new Array(n);

    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += nums[i];
    }

    let leftSum = 0;
    let rightSum = totalSum;

    for (let i = 0; i < n; i++) {
        rightSum -= nums[i];
        answer[i] = Math.abs(leftSum - rightSum);
        leftSum += nums[i];
    }

    return answer;
};
