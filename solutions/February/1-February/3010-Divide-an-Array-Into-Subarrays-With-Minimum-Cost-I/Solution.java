/**
 * Problem: LeetCode 3010 - Divide an Array Into Subarrays With Minimum Cost I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minimumCost(int[] nums) {
        // The first subarray always begins at index 0, so nums[0] is fixed.
        int firstCost = nums[0];

        // Find the two smallest elements in the remaining elements nums[1 ... n - 1].
        int min1 = Integer.MAX_VALUE;
        int min2 = Integer.MAX_VALUE;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < min1) {
                min2 = min1;
                min1 = nums[i];
            } else if (nums[i] < min2) {
                min2 = nums[i];
            }
        }

        return firstCost + min1 + min2;
    }
}
