/**
 * Problem: LeetCode 3513 - Number of Unique XOR Triplets I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function(nums) {
    const n = nums.length;
    if (n === 1) return 1;
    if (n === 2) return 2;
    let ans = 1;
    while (ans <= n) {
        ans <<= 1;
    }
    return ans;
};
