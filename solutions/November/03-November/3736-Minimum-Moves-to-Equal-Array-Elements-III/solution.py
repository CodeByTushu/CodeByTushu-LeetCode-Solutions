"""
Problem: LeetCode 3736 - Minimum Moves to Equal Array Elements III
Difficulty: Easy
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minMoves(self, nums: List[int]) -> int:
        max_val = max(nums)
        return sum(max_val - x for x in nums)
