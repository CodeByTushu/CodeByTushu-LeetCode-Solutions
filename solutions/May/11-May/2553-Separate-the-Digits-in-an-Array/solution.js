/**
 * Problem: LeetCode 2553 - Separate the Digits in an Array
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var separateDigits = function(nums) {
    const ans = [];
    for (let num of nums) {
        const temp = [];
        while (num > 0) {
            temp.push(num % 10);
            num = Math.floor(num / 10);
        }
        for (let i = temp.length - 1; i >= 0; i--) {
            ans.push(temp[i]);
        }
    }
    return ans;
};
