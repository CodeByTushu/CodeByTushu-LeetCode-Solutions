"""
Problem: LeetCode 2770 - Maximum Number of Jumps to Reach the Last Index
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def maximumJumps(self, nums: List[int], target: int) -> int:
        n = len(nums)
        dp = [-1] * n
        dp[0] = 0

        for i in range(1, n):
            for j in range(i):
                if dp[j] != -1:
                    diff = nums[i] - nums[j]
                    if -target <= diff <= target:
                        if dp[j] + 1 > dp[i]:
                            dp[i] = dp[j] + 1

        return dp[n - 1]
