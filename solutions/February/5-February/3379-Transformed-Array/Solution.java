/**
 * Problem: LeetCode 3379 - Transformed Array
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[] constructTransformedArray(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        for (int i = 0; i < n; i++) {
            // In a circular array of length n, moving nums[i] steps (positive for right,
            // negative for left) lands at ((i + nums[i]) % n + n) % n.
            int targetIndex = ((i + nums[i]) % n + n) % n;
            result[i] = nums[targetIndex];
        }

        return result;
    }
}
