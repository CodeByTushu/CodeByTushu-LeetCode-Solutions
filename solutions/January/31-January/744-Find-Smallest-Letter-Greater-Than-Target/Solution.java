/**
 * Problem: LeetCode 744 - Find Smallest Letter Greater Than Target
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 * 
 * Binary Search (Upper Bound)
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

class Solution {
    public char nextGreatestLetter(char[] letters, char target) {
        int left = 0;
        int right = letters.length;

        // Perform upper bound binary search
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (letters[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // Wrap around to letters[0] if no character is strictly greater than target
        return letters[left % letters.length];
    }
}
