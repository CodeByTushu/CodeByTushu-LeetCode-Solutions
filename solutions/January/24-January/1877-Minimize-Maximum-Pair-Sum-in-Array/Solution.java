/**
 * Problem: LeetCode 1877 - Minimize Maximum Pair Sum in Array
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 * 
 * Greedy + Two Pointers Approach (Sorting)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (or O(log n) for sorting recursion stack)
 */

import java.util.Arrays;

class Solution {
    public int minPairSum(int[] nums) {
        Arrays.sort(nums);
        int maxPairSum = 0;
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int currentSum = nums[left] + nums[right];
            maxPairSum = Math.max(maxPairSum, currentSum);
            left++;
            right--;
        }

        return maxPairSum;
    }
}
