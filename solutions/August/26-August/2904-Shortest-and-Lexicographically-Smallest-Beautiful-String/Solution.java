/**
 * Problem: LeetCode 2904 - Shortest and Lexicographically Smallest Beautiful String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String shortestBeautifulSubstring(String s, int k) {
        int n = s.length();
        String result = "";
        int minLen = Integer.MAX_VALUE;

        int left = 0, ones = 0;
        for (int right = 0; right < n; right++) {
            if (s.charAt(right) == '1') {
                ones++;
            }

            // shrink from left while window has more than k ones,
            // or while shrinking still keeps exactly k ones
            while (ones > k || (left <= right && s.charAt(left) == '0' && ones == k)) {
                if (s.charAt(left) == '1') {
                    ones--;
                }
                left++;
            }

            if (ones == k) {
                int len = right - left + 1;
                String candidate = s.substring(left, right + 1);
                if (len < minLen || (len == minLen && candidate.compareTo(result) < 0)) {
                    minLen = len;
                    result = candidate;
                }
            }
        }

        return result;
    }
}
