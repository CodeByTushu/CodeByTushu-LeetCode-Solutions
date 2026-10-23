/**
 * Problem: LeetCode 1752 - Check if Array Is Sorted and Rotated
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            // Check if there is an inversion between adjacent elements cyclically
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }

        // A valid sorted and rotated array has at most 1 drop point
        return count <= 1;
    }
}
