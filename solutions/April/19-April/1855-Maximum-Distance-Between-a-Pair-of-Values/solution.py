"""
Problem: LeetCode 1855 - Maximum Distance Between a Pair of Values
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxDistance(self, nums1: List[int], nums2: List[int]) -> int:
        max_dist = 0
        i = 0
        j = 0
        m, n = len(nums1), len(nums2)
        
        while i < m and j < n:
            if nums1[i] <= nums2[j]:
                max_dist = max(max_dist, j - i)
                j += 1
            else:
                i += 1
                
        return max_dist
