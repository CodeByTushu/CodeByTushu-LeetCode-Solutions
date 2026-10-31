/**
 * Problem: LeetCode 396 - Rotate Function
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxRotateFunction(int[] nums) {
        int n = nums.length;
        long totalSum = 0;
        long currentF = 0;

        for (int i = 0; i < n; i++) {
            totalSum += nums[i];
            currentF += (long) i * nums[i];
        }

        long maxF = currentF;

        for (int k = 1; k < n; k++) {
            currentF += totalSum - (long) n * nums[n - k];
            maxF = Math.max(maxF, currentF);
        }

        return (int) maxF;
    }
}
