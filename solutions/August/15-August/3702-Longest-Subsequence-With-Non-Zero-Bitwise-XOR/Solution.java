/**
 * Problem: LeetCode 3702 - Longest Subsequence With Non-Zero Bitwise XOR
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int longestSubsequence(int[] nums) {
        int totalXor = 0;
        boolean hasNonZero = false;

        for (int num : nums) {
            totalXor ^= num;
            if (num != 0) {
                hasNonZero = true;
            }
        }

        int n = nums.length;

        if (totalXor != 0) {
            return n;
        }

        return hasNonZero ? n - 1 : 0;
    }
}
