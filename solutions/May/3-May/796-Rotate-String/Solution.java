/**
 * Problem: LeetCode 796 - Rotate String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean rotateString(String s, String goal) {
        return s.length() == goal.length() && (s + s).contains(goal);
    }
}
