"""
Problem: LeetCode 2540 - Minimum Common Value
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def getCommon(self, nums1: List[int], nums2: List[int]) -> int:
        i, j = 0, 0
        n, m = len(nums1), len(nums2)

        # Two-pointer traversal over both sorted arrays
        while i < n and j < m:
            if nums1[i] == nums2[j]:
                return nums1[i]
            elif nums1[i] < nums2[j]:
                i += 1
            else:
                j += 1

        return -1
