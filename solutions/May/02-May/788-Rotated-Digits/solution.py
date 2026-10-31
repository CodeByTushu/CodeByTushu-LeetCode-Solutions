"""
Problem: LeetCode 788 - Rotated Digits
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def rotatedDigits(self, n: int) -> int:
        dp = [0] * (n + 1)
        count = 0

        for i in range(n + 1):
            if i < 10:
                if i in (0, 1, 8):
                    dp[i] = 1
                elif i in (2, 5, 6, 9):
                    dp[i] = 2
                    count += 1
            else:
                a = dp[i // 10]
                b = dp[i % 10]
                if a == 1 and b == 1:
                    dp[i] = 1
                elif a >= 1 and b >= 1:
                    dp[i] = 2
                    count += 1

        return count
