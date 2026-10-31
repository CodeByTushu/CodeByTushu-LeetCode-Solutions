/**
 * Problem: LeetCode 2840 - Check if Strings Can be Made Equal With Operations II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkStrings(String s1, String s2) {
        int n = s1.length();
        int[] countEven = new int[26];
        int[] countOdd = new int[26];

        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                countEven[s1.charAt(i) - 'a']++;
                countEven[s2.charAt(i) - 'a']--;
            } else {
                countOdd[s1.charAt(i) - 'a']++;
                countOdd[s2.charAt(i) - 'a']--;
            }
        }

        for (int i = 0; i < 26; i++) {
            if (countEven[i] != 0 || countOdd[i] != 0) {
                return false;
            }
        }

        return true;
    }
}
