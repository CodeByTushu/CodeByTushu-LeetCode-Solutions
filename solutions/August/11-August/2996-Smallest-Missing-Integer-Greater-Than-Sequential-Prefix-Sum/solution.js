/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    const n = nums.length;
    let sum = nums[0];
    let i = 1;
    while (i < n && nums[i] === nums[i - 1] + 1) {
        sum += nums[i];
        i++;
    }

    const set = new Set(nums);
    while (set.has(sum)) {
        sum++;
    }

    return sum;
};
