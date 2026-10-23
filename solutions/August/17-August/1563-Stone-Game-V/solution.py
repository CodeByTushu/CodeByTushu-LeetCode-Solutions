"""
Problem: LeetCode 1563 - Stone Game V
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def stoneGameV(self, stoneValue: List[int]) -> int:
        n = len(stoneValue)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stoneValue[i]

        memo = [[-1] * n for _ in range(n)]

        def solve(l: int, r: int) -> int:
            if l == r:
                return 0
            if memo[l][r] != -1:
                return memo[l][r]

            best = 0
            for m in range(l, r):
                left_sum = prefix[m + 1] - prefix[l]
                right_sum = prefix[r + 1] - prefix[m + 1]

                if left_sum < right_sum:
                    score = left_sum + solve(l, m)
                elif left_sum > right_sum:
                    score = right_sum + solve(m + 1, r)
                else:
                    score = left_sum + max(solve(l, m), solve(m + 1, r))

                if score > best:
                    best = score

            memo[l][r] = best
            return best

        return solve(0, n - 1)
