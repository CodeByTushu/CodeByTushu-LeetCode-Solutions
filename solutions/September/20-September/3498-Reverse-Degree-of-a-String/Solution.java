/**
 * Problem: LeetCode 3498 - Reverse Degree of a String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int reverseDegree(String s) {
        int result = 0;
        for (int i = 0; i < s.length(); i++) {
            int reversedAlphabetPos = 26 - (s.charAt(i) - 'a');
            int stringPos = i + 1;
            result += reversedAlphabetPos * stringPos;
        }
        return result;
    }
}
