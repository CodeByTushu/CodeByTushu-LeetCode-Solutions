"""
Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List


class Solution:
    def maximumAmount(self, coins: List[List[int]]) -> int:
        m, n = len(coins), len(coins[0])
        NEG_INF = -10**9

        # dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
        dp = [[[NEG_INF] * 3 for _ in range(n)] for _ in range(m)]

        # Base case at (0, 0)
        dp[0][0][0] = coins[0][0]
        if coins[0][0] < 0:
            dp[0][0][1] = 0
            dp[0][0][2] = 0
        else:
            dp[0][0][1] = coins[0][0]
            dp[0][0][2] = coins[0][0]

        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue

                for k in range(3):
                    max_val = NEG_INF

                    # From top (i - 1, j)
                    if i > 0:
                        if dp[i - 1][j][k] != NEG_INF:
                            max_val = max(max_val, dp[i - 1][j][k] + coins[i][j])
                        if k > 0 and coins[i][j] < 0 and dp[i - 1][j][k - 1] != NEG_INF:
                            max_val = max(max_val, dp[i - 1][j][k - 1])

                    # From left (i, j - 1)
                    if j > 0:
                        if dp[i][j - 1][k] != NEG_INF:
                            max_val = max(max_val, dp[i][j - 1][k] + coins[i][j])
                        if k > 0 and coins[i][j] < 0 and dp[i][j - 1][k - 1] != NEG_INF:
                            max_val = max(max_val, dp[i][j - 1][k - 1])

                    dp[i][j][k] = max_val

        return max(dp[m - 1][n - 1])
