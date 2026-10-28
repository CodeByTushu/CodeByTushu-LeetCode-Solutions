"""
Problem: LeetCode 3882 - Minimum XOR Path in a Grid
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        # dp[i][j][x] indicates whether XOR value x is reachable at cell (i, j)
        dp = [[[False] * 1024 for _ in range(n)] for _ in range(m)]
        dp[0][0][grid[0][0]] = True
        
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                val = grid[i][j]
                for x in range(1024):
                    reachable = False
                    if i > 0 and dp[i - 1][j][x]:
                        reachable = True
                    if j > 0 and dp[i][j - 1][x]:
                        reachable = True
                    if reachable:
                        dp[i][j][x ^ val] = True
                        
        for x in range(1024):
            if dp[m - 1][n - 1][x]:
                return x
                
        return -1
