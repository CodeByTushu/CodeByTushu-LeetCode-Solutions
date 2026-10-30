/**
 * Problem: 2839. Check if Strings Can be Made Equal With Operations I
 * Difficulty: Easy
 * Language: Java
 * 
 * Approach:
 * Strings s1 and s2 both have a fixed length of 4.
 * Swapping characters at indices with j - i = 2 means:
 * - Indices 0 and 2 can be swapped.
 * - Indices 1 and 3 can be swapped.
 * Characters at even indices cannot swap with characters at odd indices.
 * 
 * Therefore, s1 can be transformed into s2 if and only if:
 * 1. {s1[0], s1[2]} == {s2[0], s2[2]}
 * 2. {s1[1], s1[3]} == {s2[1], s2[3]}
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

class Solution {
    public boolean canBeEqual(String s1, String s2) {
        boolean evenMatch = (s1.charAt(0) == s2.charAt(0) && s1.charAt(2) == s2.charAt(2)) ||
                            (s1.charAt(0) == s2.charAt(2) && s1.charAt(2) == s2.charAt(0));

        boolean oddMatch = (s1.charAt(1) == s2.charAt(1) && s1.charAt(3) == s2.charAt(3)) ||
                           (s1.charAt(1) == s2.charAt(3) && s1.charAt(3) == s2.charAt(1));

        return evenMatch && oddMatch;
    }
}
