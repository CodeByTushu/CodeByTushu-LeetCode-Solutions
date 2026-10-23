/**
 * Problem: LeetCode 2091 - Removing Minimum and Maximum From Array
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minimumDeletions(int[] nums) {
        int n = nums.length;
        
        // Find indices of min and max
        int minIdx = 0, maxIdx = 0;
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[minIdx]) minIdx = i;
            if (nums[i] > nums[maxIdx]) maxIdx = i;
        }
        
        // Make sure left <= right for convenience
        int left = Math.min(minIdx, maxIdx);
        int right = Math.max(minIdx, maxIdx);
        
        // Strategy 1: Both from front → remove up to right+1 elements
        int bothFront = right + 1;
        
        // Strategy 2: Both from back → remove from left to end
        int bothBack = n - left;
        
        // Strategy 3: left from front, right from back
        int splitWay = (left + 1) + (n - right);
        
        return Math.min(bothFront, Math.min(bothBack, splitWay));
    }
}
