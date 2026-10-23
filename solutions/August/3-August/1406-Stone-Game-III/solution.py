"""
Problem: LeetCode 1406 - Stone Game III
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def stoneGameIII(self, stoneValue: list[int]) -> str:
        n = len(stoneValue)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            take = 0
            best = float('-inf')
            for k in range(min(3, n - i)):
                take += stoneValue[i + k]
                best = max(best, take - dp[i + k + 1])
            dp[i] = best

        if dp[0] > 0:
            return "Alice"
        elif dp[0] < 0:
            return "Bob"
        else:
            return "Tie"
