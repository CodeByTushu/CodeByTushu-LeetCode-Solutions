"""
Problem: LeetCode 486 - Predict the Winner
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def predictTheWinner(self, nums: list[int]) -> bool:
        n = len(nums)
        # dp[i][j] stores the maximum score difference achievable from nums[i..j]
        dp = [[0] * n for _ in range(n)]

        for i in range(n):
            dp[i][i] = nums[i]

        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])

        return dp[0][n - 1] >= 0
