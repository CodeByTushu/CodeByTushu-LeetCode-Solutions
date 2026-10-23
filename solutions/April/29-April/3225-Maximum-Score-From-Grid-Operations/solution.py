"""
Problem: LeetCode 3225 - Maximum Score From Grid Operations
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maximumScore(self, grid: List[List[int]]) -> int:
        n = len(grid)
        s = [[0] * (n + 1) for _ in range(n)]
        for j in range(n):
            for i in range(n):
                s[j][i + 1] = s[j][i] + grid[i][j]

        prev_pick = [0] * (n + 1)
        prev_skip = [0] * (n + 1)

        for j in range(1, n):
            curr_pick = [0] * (n + 1)
            curr_skip = [0] * (n + 1)

            for curr in range(n + 1):
                for prev in range(n + 1):
                    if curr > prev:
                        score = s[j - 1][curr] - s[j - 1][prev]
                        curr_pick[curr] = max(curr_pick[curr], prev_skip[prev] + score)
                        curr_skip[curr] = max(curr_skip[curr], prev_skip[prev] + score)
                    else:
                        score = s[j][prev] - s[j][curr]
                        curr_pick[curr] = max(curr_pick[curr], prev_pick[prev] + score)
                        curr_skip[curr] = max(curr_skip[curr], prev_pick[prev])

            prev_pick = curr_pick
            prev_skip = curr_skip

        return max(prev_pick)
