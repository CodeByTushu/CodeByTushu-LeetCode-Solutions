"""
Problem: 2333. Minimum Sum of Squared Difference
Difficulty: Medium
Link: https://leetcode.com/problems/minimum-sum-of-squared-difference/
Author: CodeByTushu
Date: 10-10-2026

Approach:
- Calculate absolute differences diff[i] = |nums1[i] - nums2[i]|.
- Total reductions available: k = k1 + k2.
- Greedily reduce the largest differences first to minimize the sum of squares.
- Count frequency of differences in a bucket array of size max(diff) + 1.
- Traverse downwards from max_diff to 1, transferring decremented items to count[d - 1].

Time Complexity: O(N + M) where M = max(diff) <= 10^5.
Space Complexity: O(M) for frequency bucket array.
"""

from typing import List

class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        n = len(nums1)
        diff = [abs(nums1[i] - nums2[i]) for i in range(n)]
        max_diff = max(diff) if diff else 0
        
        if max_diff == 0:
            return 0
            
        k = k1 + k2
        count = [0] * (max_diff + 1)
        for d in diff:
            count[d] += 1
            
        for d in range(max_diff, 0, -1):
            if count[d] > 0 and k > 0:
                take = min(count[d], k)
                count[d] -= take
                count[d - 1] += take
                k -= take
                if k == 0:
                    break
                    
        return sum(count[d] * d * d for d in range(1, max_diff + 1))
