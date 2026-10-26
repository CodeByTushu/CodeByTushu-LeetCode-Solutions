/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countBinarySubstrings(String s) {
        int prevRun = 0;
        int currRun = 1;
        int count = 0;

        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                currRun++;
            } else {
                count += Math.min(prevRun, currRun);
                prevRun = currRun;
                currRun = 1;
            }
        }
        count += Math.min(prevRun, currRun);

        return count;
    }
}
