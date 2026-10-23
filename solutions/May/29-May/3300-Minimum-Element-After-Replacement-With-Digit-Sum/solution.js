/**
 * Problem: LeetCode 3300 - Minimum Element After Replacement With Digit Sum
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function(nums) {
    let minVal = Infinity;

    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        let temp = nums[i];
        while (temp > 0) {
            sum += temp % 10;
            temp = Math.floor(temp / 10);
        }
        if (sum < minVal) {
            minVal = sum;
        }
    }

    return minVal;
};
