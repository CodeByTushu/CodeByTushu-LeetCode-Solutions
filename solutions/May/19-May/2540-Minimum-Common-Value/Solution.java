/**
 * Problem: LeetCode 2540 - Minimum Common Value
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int getCommon(int[] nums1, int[] nums2) {
        int i = 0;
        int j = 0;
        int n = nums1.length;
        int m = nums2.length;

        // Two-pointer linear traversal over both sorted arrays
        while (i < n && j < m) {
            if (nums1[i] == nums2[j]) {
                return nums1[i]; // Smallest common element found
            } else if (nums1[i] < nums2[j]) {
                i++;
            } else {
                j++;
            }
        }

        return -1;
    }
}
