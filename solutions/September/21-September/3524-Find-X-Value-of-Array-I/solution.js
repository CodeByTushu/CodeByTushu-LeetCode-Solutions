/**
 * Problem: LeetCode 3524 - Find X Value of Array I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
    const n = nums.length;
    const result = new Array(k).fill(0);
    let dp = new Array(k).fill(0);
    for (let r = 0; r < n; r++) {
        const newDp = new Array(k).fill(0);
        const valMod = nums[r] % k;
        for (let rem = 0; rem < k; rem++) {
            if (dp[rem] > 0) {
                const newRem = (rem * valMod) % k;
                newDp[newRem] += dp[rem];
            }
        }
        newDp[valMod]++;
        for (let x = 0; x < k; x++) {
            result[x] += newDp[x];
        }
        dp = newDp;
    }
    return result;
};
