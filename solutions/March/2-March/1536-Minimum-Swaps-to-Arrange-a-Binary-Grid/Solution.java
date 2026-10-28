/**
 * Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minSwaps(int[][] grid) {
        int n = grid.length;
        int[] trailingZeros = new int[n];

        // Step 1: Count trailing zeros for each row
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = n - 1; j >= 0; j--) {
                if (grid[i][j] == 0) {
                    count++;
                } else {
                    break;
                }
            }
            trailingZeros[i] = count;
        }

        int swaps = 0;

        // Step 2: For each row i, find the first available row with >= (n - 1 - i) trailing zeros
        for (int i = 0; i < n; i++) {
            int requiredZeros = n - 1 - i;
            int foundIdx = -1;

            for (int j = i; j < n; j++) {
                if (trailingZeros[j] >= requiredZeros) {
                    foundIdx = j;
                    break;
                }
            }

            if (foundIdx == -1) {
                return -1;
            }

            // Step 3: Shift the qualifying row up to position i
            swaps += (foundIdx - i);
            int temp = trailingZeros[foundIdx];
            for (int j = foundIdx; j > i; j--) {
                trailingZeros[j] = trailingZeros[j - 1];
            }
            trailingZeros[i] = temp;
        }

        return swaps;
    }
}
