"""
Problem: LeetCode 2091 - Removing Minimum and Maximum From Array
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minimumDeletions(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n

        # Find indices of min and max
        min_idx = 0
        max_idx = 0
        for i in range(1, n):
            if nums[i] < nums[min_idx]:
                min_idx = i
            if nums[i] > nums[max_idx]:
                max_idx = i

        # Make sure left <= right for convenience
        left = min(min_idx, max_idx)
        right = max(min_idx, max_idx)

        # Strategy 1: Both from front -> remove up to right + 1 elements
        both_front = right + 1

        # Strategy 2: Both from back -> remove from left to end
        both_back = n - left

        # Strategy 3: left from front, right from back
        split_way = (left + 1) + (n - right)

        return min(both_front, both_back, split_way)
