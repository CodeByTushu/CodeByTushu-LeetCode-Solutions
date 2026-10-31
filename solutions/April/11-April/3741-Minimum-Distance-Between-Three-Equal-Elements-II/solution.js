/**
 * Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function(nums) {
    const n = nums.length;
    const prev1 = new Int32Array(n + 1);
    const prev2 = new Int32Array(n + 1);
    prev1.fill(-1);
    prev2.fill(-1);

    let minDistance = Infinity;

    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (prev2[val] !== -1) {
            const dist = 2 * (i - prev2[val]);
            if (dist < minDistance) {
                minDistance = dist;
            }
        }
        prev2[val] = prev1[val];
        prev1[val] = i;
    }

    return minDistance === Infinity ? -1 : minDistance;
};
