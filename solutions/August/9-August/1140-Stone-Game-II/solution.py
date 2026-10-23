"""
Problem: LeetCode 1140 - Stone Game II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        suffix_sum = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix_sum[i] = suffix_sum[i + 1] + piles[i]

        memo = {}

        def solve(i: int, m: int) -> int:
            # If current player can take all remaining piles
            if i + 2 * m >= n:
                return suffix_sum[i]

            if (i, m) in memo:
                return memo[(i, m)]

            best = 0
            for x in range(1, 2 * m + 1):
                opponent_gets = solve(i + x, max(m, x))
                best = max(best, suffix_sum[i] - opponent_gets)

            memo[(i, m)] = best
            return best

        return solve(0, 1)
