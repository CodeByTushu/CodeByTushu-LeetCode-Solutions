/**
 * Problem: LeetCode 1855 - Maximum Distance Between a Pair of Values
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int maxDistance(int[] nums1, int[] nums2) {
        int maxDist = 0;
        int i = 0;
        int j = 0;
        final int m = nums1.length;
        final int n = nums2.length;
        
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) {
                maxDist = Math.max(maxDist, j - i);
                j++; // Greedily extend distance with current i
            } else {
                i++; // nums1[i] is too large for remaining elements in nums2
            }
        }
        
        return maxDist;
    }
}
