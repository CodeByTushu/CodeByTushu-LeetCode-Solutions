"""
Problem: LeetCode 1621 - Number of Sets of K Non-Overlapping Line Segments
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def numberOfSets(self, n: int, k: int) -> int:
        MOD = 1_000_000_007
        total = n + k - 1
        choose = 2 * k
        return self.combination(total, choose, MOD)

    def combination(self, n: int, r: int, MOD: int) -> int:
        if r > n:
            return 0
        dp = [[0] * (r + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            dp[i][0] = 1
        for i in range(1, n + 1):
            for j in range(1, min(i, r) + 1):
                dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD
        return dp[n][r]
