"""
Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        m = len(matrix)
        n = len(matrix[0])
        max_area = 0

        # Accumulate consecutive 1s for each column
        for i in range(1, m):
            for j in range(n):
                if matrix[i][j] == 1:
                    matrix[i][j] += matrix[i - 1][j]

        # For each row, sort heights in descending order to compute maximum rectangle
        for i in range(m):
            row = sorted(matrix[i], reverse=True)
            for k in range(n):
                height = row[k]
                width = k + 1
                max_area = max(max_area, height * width)

        return max_area
