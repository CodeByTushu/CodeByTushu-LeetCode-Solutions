"""
Problem: LeetCode 1292 - Maximum Side Length of a Square with Sum Less than or Equal to Threshold
Difficulty: Medium
Language: Python
Author: CodeByTushu

Optimized 2D Prefix Sum + Greedy Window Expansion Approach
Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

from typing import List

class Solution:
    def maxSideLength(self, mat: List[List[int]], threshold: int) -> int:
        m, n = len(mat), len(mat[0])
        pref = [[0] * (n + 1) for _ in range(m + 1)]

        # Precompute 2D prefix sum table
        for i in range(m):
            for j in range(n):
                pref[i + 1][j + 1] = mat[i][j] + pref[i][j + 1] + pref[i + 1][j] - pref[i][j]

        max_len = 0

        # Greedily attempt to increase side length at each bottom-right corner (i, j)
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if i > max_len and j > max_len:
                    k = max_len + 1
                    sub_sum = pref[i][j] - pref[i - k][j] - pref[i][j - k] + pref[i - k][j - k]
                    if sub_sum <= threshold:
                        max_len += 1

        return max_len
