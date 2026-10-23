/**
 * Problem: LeetCode 3867 - Sum of GCD of Formed Pairs
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * Computes the Greatest Common Divisor using the Euclidean algorithm
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var gcdSum = function(nums) {
    const n = nums.length;
    const prefixGcd = new Int32Array(n);
    let mx = 0;
    
    for (let i = 0; i < n; i++) {
        if (nums[i] > mx) {
            mx = nums[i];
        }
        prefixGcd[i] = gcd(nums[i], mx);
    }
    
    prefixGcd.sort();
    
    let ans = 0;
    let l = 0, r = n - 1;
    while (l < r) {
        ans += gcd(prefixGcd[l], prefixGcd[r]);
        l++;
        r--;
    }
    
    return ans;
};
