"""
Problem: LeetCode 1458 - Max Dot Product of Two Subsequences
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxDotProduct(self, nums1: List[int], nums2: List[int]) -> int:
        n, m = len(nums1), len(nums2)
        dp = [[float('-inf')] * (m + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                prod = nums1[i - 1] * nums2[j - 1]
                take_both = prod + max(0, dp[i - 1][j - 1])
                dp[i][j] = max(take_both, dp[i - 1][j], dp[i][j - 1])

        return int(dp[n][m])
