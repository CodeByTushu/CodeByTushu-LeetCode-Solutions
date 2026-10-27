/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minPartitions(String n) {
        int maxDigit = 0;
        int len = n.length();
        for (int i = 0; i < len; i++) {
            int digit = n.charAt(i) - '0';
            if (digit > maxDigit) {
                maxDigit = digit;
                if (maxDigit == 9) {
                    return 9; // Early exit since no decimal digit can exceed 9
                }
            }
        }
        return maxDigit;
    }
}
