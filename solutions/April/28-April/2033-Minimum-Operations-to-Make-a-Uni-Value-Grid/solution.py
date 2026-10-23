"""
Problem: LeetCode 2033 - Minimum Operations to Make a Uni-Value Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minOperations(self, grid: List[List[int]], x: int) -> int:
        vals = [val for row in grid for val in row]
        rem = vals[0] % x

        for val in vals:
            if val % x != rem:
                return -1

        vals.sort()
        median = vals[len(vals) // 2]

        return sum(abs(val - median) // x for val in vals)
