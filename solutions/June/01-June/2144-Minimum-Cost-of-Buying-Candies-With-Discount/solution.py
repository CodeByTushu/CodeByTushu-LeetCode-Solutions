"""
Problem: LeetCode 2144 - Minimum Cost of Buying Candies With Discount
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimumCost(self, cost: List[int]) -> int:
        cost.sort(reverse=True)
        total = 0
        for i, c in enumerate(cost):
            if (i + 1) % 3 != 0:
                total += c
        return total
