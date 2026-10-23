"""
Problem: LeetCode 2463 - Minimum Total Distance Traveled
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def minimumTotalDistance(self, robot: List[int], factory: List[List[int]]) -> int:
        robot.sort()
        factory.sort(key=lambda f: f[0])

        n = len(robot)
        m = len(factory)
        INF = float('inf')

        dp = [INF] * (n + 1)
        dp[0] = 0

        for pos, limit in factory:
            next_dp = list(dp)
            for i in range(1, n + 1):
                cost = 0
                for k in range(1, min(i, limit) + 1):
                    cost += abs(robot[i - k] - pos)
                    if dp[i - k] != INF:
                        next_dp[i] = min(next_dp[i], dp[i - k] + cost)
            dp = next_dp

        return dp[n]
