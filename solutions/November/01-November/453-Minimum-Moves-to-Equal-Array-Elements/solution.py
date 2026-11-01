"""
Problem: LeetCode 453 - Minimum Moves to Equal Array Elements
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minMoves(self, nums: List[int]) -> int:
        min_val = min(nums)
        return sum(x - min_val for x in nums)
