/**
 * Problem: LeetCode 3453 - Separate Squares I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public double separateSquares(int[][] squares) {
        long totalArea = 0;
        double low = 0.0;
        double high = 0.0;

        for (int[] sq : squares) {
            long l = sq[2];
            totalArea += l * l;
            high = Math.max(high, (double) sq[1] + l);
        }

        double targetArea = totalArea / 2.0;

        // Binary search for the minimum horizontal line y-coordinate
        for (int iter = 0; iter < 80; iter++) {
            double mid = low + (high - low) / 2.0;
            if (getAreaBelow(squares, mid) >= targetArea) {
                high = mid;
            } else {
                low = mid;
            }
        }

        return low;
    }

    private double getAreaBelow(int[][] squares, double yLine) {
        double area = 0.0;
        for (int[] sq : squares) {
            double y = sq[1];
            double l = sq[2];
            if (yLine > y) {
                double h = Math.min(l, yLine - y);
                area += h * l;
            }
        }
        return area;
    }
}
