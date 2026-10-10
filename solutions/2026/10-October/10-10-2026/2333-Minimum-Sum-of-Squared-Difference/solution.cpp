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
 * - Greedily reduce the highest difference values using a frequency bucket.
 * - Step down from maxDiff down to 1, updating count[d] and count[d - 1].
 *
 * Time Complexity: O(N + M) where M = max(diff) <= 10^5.
 * Space Complexity: O(M) for the bucket frequency array.
 */

#include <vector>
#include <cmath>
#include <algorithm>

class Solution {
public:
    long long minSumSquareDiff(std::vector<int>& nums1, std::vector<int>& nums2, int k1, int k2) {
        int n = nums1.size();
        int maxDiff = 0;
        std::vector<int> diff(n);
        long long k = (long long)k1 + k2;

        for (int i = 0; i < n; i++) {
            diff[i] = std::abs(nums1[i] - nums2[i]);
            if (diff[i] > maxDiff) {
                maxDiff = diff[i];
            }
        }

        if (maxDiff == 0 || k == 0) {
            long long initialSum = 0;
            for (int d : diff) {
                initialSum += (long long)d * d;
            }
            return initialSum;
        }

        std::vector<int> count(maxDiff + 1, 0);
        for (int d : diff) {
            count[d]++;
        }

        for (int d = maxDiff; d > 0 && k > 0; d--) {
            if (count[d] > 0) {
                long long take = std::min((long long)count[d], k);
                count[d] -= (int)take;
                count[d - 1] += (int)take;
                k -= take;
            }
        }

        long long minSquaredSum = 0;
        for (int d = 1; d <= maxDiff; d++) {
            if (count[d] > 0) {
                minSquaredSum += (long long)count[d] * (long long)d * d;
            }
        }

        return minSquaredSum;
    }
};
