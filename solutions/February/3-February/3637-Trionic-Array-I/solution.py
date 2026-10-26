"""
Problem: LeetCode 3637 - Trionic Array I
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:
    def isTrionic(self, nums: List[int]) -> bool:
        n = len(nums)
        if n < 4:
            return False

        i = 0

        # Phase 1: Strictly increasing to peak p
        while i + 1 < n and nums[i] < nums[i + 1]:
            i += 1
        p = i
        if p == 0 or p >= n - 2:
            return False

        # Phase 2: Strictly decreasing to valley q
        while i + 1 < n and nums[i] > nums[i + 1]:
            i += 1
        q = i
        if q == p or q >= n - 1:
            return False

        # Phase 3: Strictly increasing to the end
        while i + 1 < n and nums[i] < nums[i + 1]:
            i += 1

        return i == n - 1
