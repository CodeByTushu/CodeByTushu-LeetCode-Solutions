/**
 * Problem: LeetCode 3120 - Count the Number of Special Characters I
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numberOfSpecialChars(String word) {
        int lowerMask = 0;
        int upperMask = 0;

        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                lowerMask |= (1 << (ch - 'a'));
            } else if (ch >= 'A' && ch <= 'Z') {
                upperMask |= (1 << (ch - 'A'));
            }
        }

        return Integer.bitCount(lowerMask & upperMask);
    }
}
