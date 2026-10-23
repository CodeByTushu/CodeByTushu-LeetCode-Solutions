/**
 * Problem: LeetCode 3090 - Maximum Length Substring With Two Occurrences
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maximumLengthSubstring(String s) {
        int n = s.length();
        int[] freq = new int[26];
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < n; right++) {
            int c = s.charAt(right) - 'a';
            freq[c]++;

            while (freq[c] > 2) {
                freq[s.charAt(left) - 'a']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
