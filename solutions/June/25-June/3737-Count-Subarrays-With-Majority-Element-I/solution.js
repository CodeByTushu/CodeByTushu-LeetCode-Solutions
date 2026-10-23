/**
 * Problem: LeetCode 3737 - Count Subarrays With Majority Element I
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        let cnt = 0;

        for (let j = i; j < n; j++) {
            if (nums[j] === target) {
                cnt++;
            }

            const len = j - i + 1;

            if (cnt * 2 > len) {
                ans++;
            }
        }
    }

    return ans;
};
