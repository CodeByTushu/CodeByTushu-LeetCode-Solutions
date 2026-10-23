/**
 * Problem: LeetCode 1975 - Maximum Matrix Sum
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public long maxMatrixSum(int[][] matrix) {
        long totalSum = 0;
        int minAbs = Integer.MAX_VALUE;
        int negCount = 0;

        for (int[] row : matrix) {
            for (int val : row) {
                if (val < 0) {
                    negCount++;
                }
                int absVal = Math.abs(val);
                totalSum += absVal;
                if (absVal < minAbs) {
                    minAbs = absVal;
                }
            }
        }

        if (negCount % 2 == 0) {
            return totalSum;
        }
        return totalSum - 2L * minAbs;
    }
}
