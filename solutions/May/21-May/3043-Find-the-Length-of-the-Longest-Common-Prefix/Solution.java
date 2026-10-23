/**
 * Problem: LeetCode 3043 - Find the Length of the Longest Common Prefix
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestCommonPrefix(int[] arr1, int[] arr2) {
        Set<Integer> prefixes = new HashSet<>();

        // Store all numerical prefixes of numbers in arr1
        for (int val : arr1) {
            while (val > 0) {
                prefixes.add(val);
                val /= 10;
            }
        }

        int maxLength = 0;

        // Check prefixes of numbers in arr2 starting from longest to shortest
        for (int val : arr2) {
            while (val > 0) {
                if (prefixes.contains(val)) {
                    maxLength = Math.max(maxLength, Integer.toString(val).length());
                    break; // Longest prefix for this number found
                }
                val /= 10;
            }
        }

        return maxLength;
    }
}
