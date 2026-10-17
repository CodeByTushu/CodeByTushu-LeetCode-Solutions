/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function(nums) {
    let totalXor = 0;
    let hasNonZero = false;

    for (const num of nums) {
        totalXor ^= num;
        if (num !== 0) {
            hasNonZero = true;
        }
    }

    const n = nums.length;
    if (totalXor !== 0) {
        return n;
    }

    return hasNonZero ? n - 1 : 0;
};
