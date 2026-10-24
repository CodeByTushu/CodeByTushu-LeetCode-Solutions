/**
 * Problem: LeetCode 1266 - Minimum Time Visiting All Points
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int minTimeToVisitAllPoints(int[][] points) {
        int totalTime = 0;

        for (int i = 1; i < points.length; i++) {
            int dx = Math.abs(points[i][0] - points[i - 1][0]);
            int dy = Math.abs(points[i][1] - points[i - 1][1]);
            // Chebyshev distance: max(|dx|, |dy|)
            totalTime += Math.max(dx, dy);
        }

        return totalTime;
    }
}
