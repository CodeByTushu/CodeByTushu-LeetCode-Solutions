/**
 * Problem: LeetCode 2078 - Two Furthest Houses With Different Colors
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int maxDistance(int[] colors) {
        final int n = colors.length;
        int maxDist = 0;
        
        // The furthest house with a different color must pair with either the first or last house
        for (int i = 0; i < n; ++i) {
            if (colors[i] != colors[0]) {
                maxDist = Math.max(maxDist, i);
            }
            if (colors[i] != colors[n - 1]) {
                maxDist = Math.max(maxDist, n - 1 - i);
            }
        }
        
        return maxDist;
    }
}
