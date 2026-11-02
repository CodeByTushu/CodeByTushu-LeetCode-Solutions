"""
Problem: LeetCode 462 - Minimum Moves to Equal Array Elements II
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        nums.sort()
        median = nums[len(nums) // 2]
        return sum(abs(x - median) for x in nums)
