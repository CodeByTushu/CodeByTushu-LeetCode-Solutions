/**
 * Problem: LeetCode 3719 - Longest Balanced Subarray I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    const n = nums.length;
    let maxLen = 0;

    const lastSeen = new Int32Array(100001);

    for (let i = 0; i < n; i++) {
        if (n - i <= maxLen) {
            break;
        }

        let distinctEven = 0;
        let distinctOdd = 0;
        const currentIteration = i + 1;

        for (let j = i; j < n; j++) {
            const val = nums[j];
            if (lastSeen[val] !== currentIteration) {
                lastSeen[val] = currentIteration;
                if ((val & 1) === 0) {
                    distinctEven++;
                } else {
                    distinctOdd++;
                }
            }

            if (distinctEven === distinctOdd) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }

    return maxLen;
};
