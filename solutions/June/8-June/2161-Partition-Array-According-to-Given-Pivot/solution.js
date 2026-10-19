/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function(nums, pivot) {
    const n = nums.length;
    const result = new Array(n);
    let index = 0;

    // Elements less than pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] < pivot) {
            result[index++] = nums[i];
        }
    }

    // Elements equal to pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] === pivot) {
            result[index++] = nums[i];
        }
    }

    // Elements greater than pivot
    for (let i = 0; i < n; i++) {
        if (nums[i] > pivot) {
            result[index++] = nums[i];
        }
    }

    return result;
};
