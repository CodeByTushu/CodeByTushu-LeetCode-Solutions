"""
Problem: LeetCode 3742 - Maximum Path Score in a Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxPathScore(self, grid: List[List[int]], k: int) -> int:
        m = len(grid)
        n = len(grid[0])
        max_cost = min(k, m + n - 1)

        dp = [[-1] * (max_cost + 1) for _ in range(n)]

        cost0 = 0 if grid[0][0] == 0 else 1
        score0 = grid[0][0]
        if cost0 <= max_cost:
            dp[0][cost0] = score0
        else:
            return -1

        for c in range(1, n):
            cost = 0 if grid[0][c] == 0 else 1
            score = grid[0][c]
            for w in range(cost, max_cost + 1):
                if dp[c - 1][w - cost] != -1:
                    dp[c][w] = dp[c - 1][w - cost] + score

        for r in range(1, m):
            next_dp = [[-1] * (max_cost + 1) for _ in range(n)]
            for c in range(n):
                cost = 0 if grid[r][c] == 0 else 1
                score = grid[r][c]
                for w in range(cost, max_cost + 1):
                    best = -1
                    if dp[c][w - cost] != -1:
                        best = max(best, dp[c][w - cost])
                    if c > 0 and next_dp[c - 1][w - cost] != -1:
                        best = max(best, next_dp[c - 1][w - cost])
                    if best != -1:
                        next_dp[c][w] = best + score
            dp = next_dp

        return max(dp[n - 1])
