"""
Problem: LeetCode 1331 - Rank Transform of an Array
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def arrayRankTransform(self, arr: List[int]) -> List[int]:
        sorted_unique = sorted(set(arr))
        rank = {val: r + 1 for r, val in enumerate(sorted_unique)}
        return [rank[num] for num in arr]
