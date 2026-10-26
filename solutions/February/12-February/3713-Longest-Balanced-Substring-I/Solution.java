/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int longestBalanced(String s) {
        int n = s.length();
        int maxLen = 0;
        char[] arr = s.toCharArray();
        int[] freq = new int[26];

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }
            Arrays.fill(freq, 0);
            int distinct = 0;
            int maxFreq = 0;

            for (int j = i; j < n; j++) {
                int c = arr[j] - 'a';
                if (freq[c] == 0) {
                    distinct++;
                }
                freq[c]++;
                if (freq[c] > maxFreq) {
                    maxFreq = freq[c];
                }

                int len = j - i + 1;
                if (len == distinct * maxFreq) {
                    if (len > maxLen) {
                        maxLen = len;
                    }
                }
            }
        }

        return maxLen;
    }
}
