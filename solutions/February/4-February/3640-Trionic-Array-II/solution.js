/**
 * Problem: LeetCode 3640 - Trionic Array II
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumTrionic = function(nums) {
    const n = nums.length;

    // leftInc[i]: Maximum sum of a strictly increasing subarray ending at index i
    const leftInc = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        leftInc[i] = nums[i];
        if (i > 0 && nums[i] > nums[i - 1]) {
            leftInc[i] = nums[i] + Math.max(0, leftInc[i - 1]);
        }
    }

    // rightInc[i]: Maximum sum of a strictly increasing subarray starting at index i
    const rightInc = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        rightInc[i] = nums[i];
        if (i + 1 < n && nums[i] < nums[i + 1]) {
            rightInc[i] = nums[i] + Math.max(0, rightInc[i + 1]);
        }
    }

    let maxSum = -Infinity;
    let i = 0;

    // Traverse all maximal strictly decreasing segments [p...q]
    while (i < n) {
        let j = i;
        while (j + 1 < n && nums[j] > nums[j + 1]) {
            j++;
        }

        if (j > i) {
            const p = i;
            const q = j;

            // Peak at p requires nums[p - 1] < nums[p]
            // Valley at q requires nums[q] < nums[q + 1]
            if (p > 0 && nums[p - 1] < nums[p] && q + 1 < n && nums[q] < nums[q + 1]) {
                let decSum = 0;
                for (let k = p; k <= q; k++) {
                    decSum += nums[k];
                }

                const total = leftInc[p - 1] + decSum + rightInc[q + 1];
                if (total > maxSum) {
                    maxSum = total;
                }
            }
        }

        i = Math.max(i + 1, j);
    }

    return maxSum;
};
