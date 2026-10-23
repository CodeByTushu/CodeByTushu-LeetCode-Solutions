/**
 * Problem: LeetCode 2657 - Find the Prefix Common Array of Two Arrays
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[] findThePrefixCommonArray(int[] A, int[] B) {
        int n = A.length;
        int[] C = new int[n];
        int[] freq = new int[n + 1];
        int commonCount = 0;

        for (int i = 0; i < n; i++) {
            // Track frequency of A[i]
            if (++freq[A[i]] == 2) {
                commonCount++;
            }

            // Track frequency of B[i]
            if (++freq[B[i]] == 2) {
                commonCount++;
            }

            C[i] = commonCount;
        }

        return C;
    }
}
