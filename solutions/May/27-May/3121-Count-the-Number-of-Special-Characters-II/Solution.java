/**
 * Problem: LeetCode 3121 - Count the Number of Special Characters II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int numberOfSpecialChars(String word) {
        int[] lastLower = new int[26];
        int[] firstUpper = new int[26];
        Arrays.fill(lastLower, -1);
        Arrays.fill(firstUpper, -1);

        int n = word.length();
        for (int i = 0; i < n; i++) {
            char ch = word.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                lastLower[ch - 'a'] = i;
            } else if (ch >= 'A' && ch <= 'Z') {
                int idx = ch - 'A';
                if (firstUpper[idx] == -1) {
                    firstUpper[idx] = i;
                }
            }
        }

        int specialCount = 0;
        for (int i = 0; i < 26; i++) {
            if (lastLower[i] != -1 && firstUpper[i] != -1 && lastLower[i] < firstUpper[i]) {
                specialCount++;
            }
        }

        return specialCount;
    }
}
