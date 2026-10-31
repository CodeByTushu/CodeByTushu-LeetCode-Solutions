/**
 * Problem: LeetCode 3640 - Trionic Array II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long maxSumTrionic(int[] nums) {
        int n = nums.length;

        // leftInc[i]: Maximum sum of a strictly increasing subarray ending at index i
        long[] leftInc = new long[n];
        for (int i = 0; i < n; i++) {
            leftInc[i] = nums[i];
            if (i > 0 && nums[i] > nums[i - 1]) {
                leftInc[i] = nums[i] + Math.max(0L, leftInc[i - 1]);
            }
        }

        // rightInc[i]: Maximum sum of a strictly increasing subarray starting at index i
        long[] rightInc = new long[n];
        for (int i = n - 1; i >= 0; i--) {
            rightInc[i] = nums[i];
            if (i + 1 < n && nums[i] < nums[i + 1]) {
                rightInc[i] = nums[i] + Math.max(0L, rightInc[i + 1]);
            }
        }

        long maxSum = Long.MIN_VALUE;
        int i = 0;

        // Traverse all maximal strictly decreasing segments [p...q]
        while (i < n) {
            int j = i;
            while (j + 1 < n && nums[j] > nums[j + 1]) {
                j++;
            }

            if (j > i) {
                int p = i;
                int q = j;

                // Validate transition points:
                // Peak at p requires nums[p - 1] < nums[p]
                // Valley at q requires nums[q] < nums[q + 1]
                if (p > 0 && nums[p - 1] < nums[p] && q + 1 < n && nums[q] < nums[q + 1]) {
                    long decSum = 0;
                    for (int k = p; k <= q; k++) {
                        decSum += nums[k];
                    }

                    long total = leftInc[p - 1] + decSum + rightInc[q + 1];
                    if (total > maxSum) {
                        maxSum = total;
                    }
                }
            }

            i = Math.max(i + 1, j);
        }

        return maxSum;
    }
}
