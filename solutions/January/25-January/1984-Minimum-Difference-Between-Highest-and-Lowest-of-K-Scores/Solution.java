/**
 * Problem: LeetCode 1984 - Minimum Difference Between Highest and Lowest of K Scores
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 * 
 * Sorting + Sliding Window Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (or O(log n) for sorting recursion stack)
 */

import java.util.Arrays;

class Solution {
    public int minimumDifference(int[] nums, int k) {
        if (k <= 1) {
            return 0;
        }

        Arrays.sort(nums);
        int minDiff = Integer.MAX_VALUE;

        for (int i = 0; i + k - 1 < nums.length; i++) {
            int currentDiff = nums[i + k - 1] - nums[i];
            minDiff = Math.min(minDiff, currentDiff);
        }

        return minDiff;
    }
}
