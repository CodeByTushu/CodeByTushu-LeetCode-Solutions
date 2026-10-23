/**
 * Problem: LeetCode 1855 - Maximum Distance Between a Pair of Values
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDistance = function(nums1, nums2) {
    let maxDist = 0;
    let i = 0;
    let j = 0;
    const m = nums1.length;
    const n = nums2.length;
    
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            if (j - i > maxDist) {
                maxDist = j - i;
            }
            j++;
        } else {
            i++;
        }
    }
    
    return maxDist;
};
