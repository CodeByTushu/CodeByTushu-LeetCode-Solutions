/**
 * Problem: LeetCode 2515 - Shortest Distance to Target String in a Circular Array
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int closestTarget(String[] words, String target, int startIndex) {
        int n = words.length;
        int minDistance = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            if (words[i].equals(target)) {
                int direct = Math.abs(i - startIndex);
                int circular = n - direct;
                minDistance = Math.min(minDistance, Math.min(direct, circular));
            }
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
