/**
 * Problem: LeetCode 3047 - Find the Largest Area of Square Inside Two Rectangles
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public long largestSquareArea(int[][] bottomLeft, int[][] topRight) {
        long maxSide = 0;
        int n = bottomLeft.length;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int xMin = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
                int xMax = Math.min(topRight[i][0], topRight[j][0]);
                int yMin = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
                int yMax = Math.min(topRight[i][1], topRight[j][1]);

                int width = xMax - xMin;
                int height = yMax - yMin;

                if (width > 0 && height > 0) {
                    long side = Math.min(width, height);
                    if (side > maxSide) {
                        maxSide = side;
                    }
                }
            }
        }

        return maxSide * maxSide;
    }
}
