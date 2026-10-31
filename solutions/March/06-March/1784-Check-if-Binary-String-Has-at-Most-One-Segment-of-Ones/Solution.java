/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkOnesSegment(String s) {
        // Because s[0] == '1' (no leading zeros),
        // any second segment of ones must be preceded by at least one '0'.
        // If "01" appears anywhere in the string, there is more than one segment.
        return !s.contains("01");
    }
}
