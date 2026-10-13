from typing import List

"""
Problem: LeetCode 3727 - Maximum Alternating Sum of Squares
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        n = len(nums)
        sq = sorted(x * x for x in nums)
        minus_count = n // 2
        return sum(sq[minus_count:]) - sum(sq[:minus_count])
