/**
 * Problem: LeetCode 1582 - Special Positions in a Binary Matrix
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numSpecial(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[] rowSum = new int[m];
        int[] colSum = new int[n];

        // Step 1: Precompute the count of 1s in each row and column
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    rowSum[i]++;
                    colSum[j]++;
                }
            }
        }

        // Step 2: Identify special positions where mat[i][j] == 1 and rowSum == 1 and colSum == 1
        int specialCount = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1 && rowSum[i] == 1 && colSum[j] == 1) {
                    specialCount++;
                }
            }
        }

        return specialCount;
    }
}
