/**
 * Problem: LeetCode 2615 - Sum of Distances
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var distance = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);

    const posMap = new Map();
    for (let i = 0; i < n; i++) {
        const val = nums[i];
        let list = posMap.get(val);
        if (!list) {
            list = [];
            posMap.set(val, list);
        }
        list.push(i);
    }

    for (const indices of posMap.values()) {
        const m = indices.length;
        if (m <= 1) continue;

        let totalSum = 0;
        for (let i = 0; i < m; i++) {
            totalSum += indices[i];
        }

        let leftSum = 0;
        for (let k = 0; k < m; k++) {
            const currentIdx = indices[k];
            const rightSum = totalSum - leftSum - currentIdx;

            const leftContrib = k * currentIdx - leftSum;
            const rightContrib = rightSum - (m - 1 - k) * currentIdx;

            result[currentIdx] = leftContrib + rightContrib;
            leftSum += currentIdx;
        }
    }

    return result;
};
