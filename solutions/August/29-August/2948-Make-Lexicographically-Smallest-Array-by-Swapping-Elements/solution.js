/**
 * Problem: LeetCode 2948 - Make Lexicographically Smallest Array by Swapping Elements
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    const n = nums.length;
    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    idx.sort((a, b) => nums[a] - nums[b]);

    const result = new Int32Array(n);
    let i = 0;

    while (i < n) {
        let j = i + 1;
        while (j < n && nums[idx[j]] - nums[idx[j - 1]] <= limit) {
            j++;
        }

        // Extract and sort indices within this connected component
        const groupIndices = Array.from(idx.subarray(i, j)).sort((a, b) => a - b);
        for (let k = 0; k < groupIndices.length; k++) {
            result[groupIndices[k]] = nums[idx[i + k]];
        }

        i = j;
    }

    return Array.from(result);
};
