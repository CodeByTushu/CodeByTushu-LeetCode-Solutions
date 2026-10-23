"""
Problem: LeetCode 1340 - Jump Game V
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        n = len(arr)
        memo = [0] * n

        def dfs(i: int) -> int:
            if memo[i]:
                return memo[i]

            res = 1

            # Jump rightwards: i + 1, ..., i + d
            for j in range(i + 1, min(i + d + 1, n)):
                if arr[j] >= arr[i]:
                    break
                res = max(res, 1 + dfs(j))

            # Jump leftwards: i - 1, ..., i - d
            for j in range(i - 1, max(i - d - 1, -1), -1):
                if arr[j] >= arr[i]:
                    break
                res = max(res, 1 + dfs(j))

            memo[i] = res
            return res

        return max(dfs(i) for i in range(n))
