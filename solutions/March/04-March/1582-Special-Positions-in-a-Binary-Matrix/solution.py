"""
Problem: LeetCode 1582 - Special Positions in a Binary Matrix
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        row_sum = [sum(row) for row in mat]
        col_sum = [sum(mat[i][j] for i in range(m)) for j in range(n)]

        special_count = 0
        for i in range(m):
            if row_sum[i] == 1:
                for j in range(n):
                    if mat[i][j] == 1 and col_sum[j] == 1:
                        special_count += 1

        return special_count
