/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String findDifferentBinaryString(String[] nums) {
        StringBuilder sb = new StringBuilder();
        int n = nums.length;

        // Cantor's Diagonalization:
        // Construct string such that char at index i differs from nums[i].charAt(i)
        for (int i = 0; i < n; i++) {
            sb.append(nums[i].charAt(i) == '0' ? '1' : '0');
        }

        return sb.toString();
    }
}
