"""
Problem: LeetCode 940 - Distinct Subsequences II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def distinctSubseqII(self, s: str) -> int:
        MOD = 1_000_000_007
        dp = [0] * 26

        for ch in s:
            c = ord(ch) - ord('a')
            total = 1
            for count in dp:
                total = (total + count) % MOD
            dp[c] = total

        ans = sum(dp) % MOD
        return ans
