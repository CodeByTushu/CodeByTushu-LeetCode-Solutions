/**
 * Problem: LeetCode 3727 - Maximum Alternating Sum of Squares
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function(nums) {
    const n = nums.length;
    const sq = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        sq[i] = nums[i] * nums[i];
    }
    sq.sort();
    const minusCount = Math.floor(n / 2);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (i < minusCount) {
            ans -= sq[i];
        } else {
            ans += sq[i];
        }
    }
    return ans;
};
