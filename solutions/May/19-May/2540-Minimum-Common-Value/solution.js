/**
 * Problem: LeetCode 2540 - Minimum Common Value
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    const n = nums1.length;
    const m = nums2.length;

    // Two-pointer traversal
    while (i < n && j < m) {
        if (nums1[i] === nums2[j]) {
            return nums1[i];
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }

    return -1;
};
