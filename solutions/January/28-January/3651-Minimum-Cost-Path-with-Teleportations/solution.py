"""
Problem: LeetCode 3651 - Minimum Cost Path with Teleportations
Difficulty: Hard
Language: Python
Author: CodeByTushu

Dynamic Programming + Suffix Minimum Optimization
Time Complexity: O(k * (m * n + maxVal))
Space Complexity: O(m * n + maxVal)
"""

from typing import List

class Solution:
    def minCost(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        max_val = max(max(row) for row in grid)

        INF = float('inf')
        dp = [[INF] * n for _ in range(m)]

        # Base case: starting at (0, 0) costs 0
        dp[0][0] = 0

        # Base layer (0 teleportations): normal moves only
        for r in range(m):
            for c in range(n):
                if r > 0 and dp[r - 1][c] != INF:
                    dp[r][c] = min(dp[r][c], dp[r - 1][c] + grid[r][c])
                if c > 0 and dp[r][c - 1] != INF:
                    dp[r][c] = min(dp[r][c], dp[r][c - 1] + grid[r][c])

        # Up to k teleportations
        for _ in range(k):
            min_at_val = [INF] * (max_val + 1)
            for r in range(m):
                for c in range(n):
                    val = grid[r][c]
                    if dp[r][c] < min_at_val[val]:
                        min_at_val[val] = dp[r][c]

            # suff_min[v] = min cost to reach any cell with value >= v
            suff_min = [INF] * (max_val + 1)
            cur_min = INF
            for v in range(max_val, -1, -1):
                if min_at_val[v] < cur_min:
                    cur_min = min_at_val[v]
                suff_min[v] = cur_min

            next_dp = [[INF] * n for _ in range(m)]

            # Teleportation step (cost 0)
            for r in range(m):
                for c in range(n):
                    next_dp[r][c] = min(dp[r][c], suff_min[grid[r][c]])

            # Normal moves step after teleportation
            for r in range(m):
                for c in range(n):
                    if r > 0 and next_dp[r - 1][c] != INF:
                        next_dp[r][c] = min(next_dp[r][c], next_dp[r - 1][c] + grid[r][c])
                    if c > 0 and next_dp[r][c - 1] != INF:
                        next_dp[r][c] = min(next_dp[r][c], next_dp[r][c - 1] + grid[r][c])

            dp = next_dp

        return dp[m - 1][n - 1]
