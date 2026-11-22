/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkString(String s) {
        // Agar string me kahin bhi "ba" substring exist karti hai,
        // iska matlab koi 'a' kisi 'b' ke baad aaya hai.
        return !s.contains("ba");
    }
}
