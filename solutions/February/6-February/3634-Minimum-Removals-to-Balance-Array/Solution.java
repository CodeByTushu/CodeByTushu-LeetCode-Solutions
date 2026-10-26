/**
 * Problem: LeetCode 3634 - Minimum Removals to Balance Array
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int minRemoval(int[] nums, int k) {
        int n = nums.length;
        Arrays.sort(nums);

        int maxKept = 1;
        int right = 0;

        for (int left = 0; left < n; left++) {
            // Use 64-bit integer to prevent overflow when nums[left] * k reaches 10^14
            long limit = (long) nums[left] * k;
            while (right < n && nums[right] <= limit) {
                right++;
            }
            maxKept = Math.max(maxKept, right - left);
        }

        return n - maxKept;
    }
}
