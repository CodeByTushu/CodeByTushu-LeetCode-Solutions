/**
 * Problem: 2333. Minimum Sum of Squared Difference
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/minimum-sum-of-squared-difference/
 * Author: CodeByTushu
 * Date: 10-10-2026
 *
 * Approach:
 * - Calculate absolute differences diff[i] = |nums1[i] - nums2[i]|.
 * - Total reductions available: k = k1 + k2.
 * - To minimize the sum of squared differences, greedily reduce the largest differences first.
 * - Since the maximum difference is bounded (<= 10^5), use bucket counting / frequency array for O(N + M) complexity.
 * - Step down from maxDiff to 1, moving reduced values to count[d - 1].
 *
 * Time Complexity: O(N + M) where M = max(diff) <= 10^5.
 * Space Complexity: O(M) for frequency bucket array.
 */

public class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int n = nums1.length;
        int maxDiff = 0;
        int[] diff = new int[n];
        long totalK = (long) k1 + k2;

        for (int i = 0; i < n; i++) {
            diff[i] = Math.abs(nums1[i] - nums2[i]);
            if (diff[i] > maxDiff) {
                maxDiff = diff[i];
            }
        }

        if (maxDiff == 0 || totalK == 0) {
            long initialSum = 0;
            for (int d : diff) {
                initialSum += (long) d * d;
            }
            return initialSum;
        }

        int[] count = new int[maxDiff + 1];
        for (int d : diff) {
            count[d]++;
        }

        for (int d = maxDiff; d > 0 && totalK > 0; d--) {
            if (count[d] > 0) {
                long take = Math.min((long) count[d], totalK);
                count[d] -= (int) take;
                count[d - 1] += (int) take;
                totalK -= take;
            }
        }

        long minSquaredSum = 0;
        for (int d = 1; d <= maxDiff; d++) {
            if (count[d] > 0) {
                minSquaredSum += (long) count[d] * (long) d * d;
            }
        }

        return minSquaredSum;
    }
}
