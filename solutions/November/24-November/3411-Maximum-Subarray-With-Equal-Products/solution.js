/**
 * Problem: LeetCode 3411 - Maximum Subarray With Equal Products
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function(nums) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => (a / gcd(a, b)) * b;

    const n = nums.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        let prod = 1;
        let g = 0;
        let l = 1;

        for (let j = i; j < n; j++) {
            prod *= nums[j];
            g = gcd(g, nums[j]);
            l = lcm(l, nums[j]);

            if (prod === l * g) {
                ans = Math.max(ans, j - i + 1);
            }
        }
    }

    return ans;
};
