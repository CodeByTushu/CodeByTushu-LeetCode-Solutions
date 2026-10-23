/**
 * Problem: LeetCode 1658 - Minimum Operations to Reduce X to Zero
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(int[] nums, int x) {
        int total = 0;
        for (int num : nums) total += num;
        int target = total - x;
        if (target < 0) return -1;
        if (target == 0) return nums.length;
        int maxLen = -1;
        int windowSum = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum > target && left <= right) {
                windowSum -= nums[left];
                left++;
            }
            if (windowSum == target) {
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }
        return maxLen == -1 ? -1 : nums.length - maxLen;
    }
}
