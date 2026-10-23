"""
Problem: LeetCode 1833 - Maximum Ice Cream Bars
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        # Maximum possible cost is 100000
        freq = [0] * 100001

        # Count frequencies
        for cost in costs:
            freq[cost] += 1

        ans = 0

        # Buy cheapest ice creams first
        for cost in range(1, 100001):
            if freq[cost] == 0:
                continue

            can_buy = min(freq[cost], coins // cost)

            ans += can_buy
            coins -= can_buy * cost

            if coins < cost:
                # Can't afford any more at this cost or higher
                continue

        return ans
