/**
 * Problem: LeetCode 3863 - Minimum Operations to Sort a String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(String s) {
        int n = s.length();
        boolean sorted = true;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i - 1) > s.charAt(i)) {
                sorted = false;
                break;
            }
        }
        if (sorted) return 0;
        if (n == 2) return -1;
        char mn = 'z', mx = 'a';
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (c < mn) mn = c;
            if (c > mx) mx = c;
        }
        if (s.charAt(0) == mn || s.charAt(n - 1) == mx) return 1;
        char minPrefix = 'z', maxSuffix = 'a';
        for (int i = 0; i < n - 1; i++) {
            minPrefix = (char) Math.min(minPrefix, s.charAt(i));
        }
        for (int i = 1; i < n; i++) {
            maxSuffix = (char) Math.max(maxSuffix, s.charAt(i));
        }
        boolean lastStrictMin = s.charAt(n - 1) < minPrefix;
        boolean firstStrictMax = s.charAt(0) > maxSuffix;
        if (lastStrictMin && firstStrictMax) return 3;
        return 2;
    }
}
