/**
 * Problem: 2840. Check if Strings Can be Made Equal With Operations II
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * We can swap any two characters whose index difference j - i is even.
 * This implies:
 * 1. Characters at even indices can be permuted arbitrarily among themselves.
 * 2. Characters at odd indices can be permuted arbitrarily among themselves.
 * 3. Parity is strictly conserved: characters cannot move between even and odd positions.
 * 
 * Thus, s1 can be transformed into s2 if and only if:
 * - The character frequency counts at even indices match between s1 and s2.
 * - The character frequency counts at odd indices match between s1 and s2.
 * 
 * We track frequency differences using two fixed-size frequency arrays of length 26.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary space (fixed-size array of 26 integers)
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
