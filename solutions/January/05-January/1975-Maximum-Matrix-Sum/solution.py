"""
Problem: LeetCode 1975 - Maximum Matrix Sum
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxMatrixSum(self, matrix: List[List[int]]) -> int:
        total_sum = 0
        min_abs = float('inf')
        neg_count = 0

        for row in matrix:
            for val in row:
                if val < 0:
                    neg_count += 1
                abs_val = abs(val)
                total_sum += abs_val
                if abs_val < min_abs:
                    min_abs = abs_val

        if neg_count % 2 == 0:
            return total_sum
        return total_sum - 2 * min_abs
