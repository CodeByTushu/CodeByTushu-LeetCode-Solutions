"""
Problem: LeetCode 3693 - Climbing Stairs II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def climbStairs(self, n: int, costs: list[int]) -> int:
        dp = [0] * (n + 1)  # dp[j] = minimum cost to reach step j

        for j in range(1, n + 1):
            best = float("inf")
            # Evaluate backward jumps of size 1, 2, or 3
            for d in range(1, 4):
                if j - d >= 0:
                    cand = dp[j - d] + costs[j - 1] + d * d
                    if cand < best:
                        best = cand
            dp[j] = best

        return dp[n]
