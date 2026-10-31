"""
Problem: LeetCode 3567 - Minimum Absolute Difference in Sliding Submatrix
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def minAbsDiff(self, grid: list[list[int]], k: int) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        rows = m - k + 1
        cols = n - k + 1
        ans = [[0] * cols for _ in range(rows)]

        for i in range(rows):
            for j in range(cols):
                window = [grid[i + r][j + c] for r in range(k) for c in range(k)]
                window.sort()
                min_diff = float('inf')

                for p in range(1, len(window)):
                    if window[p] != window[p - 1]:
                        diff = window[p] - window[p - 1]
                        if diff < min_diff:
                            min_diff = diff

                ans[i][j] = 0 if min_diff == float('inf') else min_diff

        return ans
