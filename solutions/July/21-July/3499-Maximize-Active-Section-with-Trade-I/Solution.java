/**
 * Problem: LeetCode 3499 - Maximize Active Section with Trade I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxActiveSectionsAfterTrade(String s) {
        int n = s.length();
        int ones = 0;
        int maxMerge = 0;
        int prevZeroBlock = Integer.MIN_VALUE / 2;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            int len = j - i;
            if (s.charAt(i) == '1') {
                ones += len;
            } else {
                maxMerge = Math.max(maxMerge, prevZeroBlock + len);
                prevZeroBlock = len;
            }
            i = j;
        }
        return ones + maxMerge;
    }
}
