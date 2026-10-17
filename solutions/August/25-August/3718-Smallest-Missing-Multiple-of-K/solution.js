/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function(nums, k) {
    const set = new Set(nums);

    let multiple = k;
    while (set.has(multiple)) {
        multiple += k;
    }

    return multiple;
};
