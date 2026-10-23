/**
 * Problem: LeetCode 2784 - Check if Array is Good
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean isGood(int[] nums) {
        int n = nums.length - 1;
        if (n < 1) {
            return false;
        }

        int[] count = new int[n + 1];
        for (int num : nums) {
            if (num < 1 || num > n) {
                return false;
            }
            count[num]++;
        }

        // Each number from 1 to n - 1 must appear exactly once
        for (int i = 1; i < n; i++) {
            if (count[i] != 1) {
                return false;
            }
        }

        // The number n must appear exactly twice
        return count[n] == 2;
    }
}
