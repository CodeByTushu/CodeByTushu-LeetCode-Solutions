"""
Problem: LeetCode 3963 - Create Grid With Exactly One Path
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def createGrid(self, m: int, n: int) -> List[str]:
        grid = []
        for i in range(m):
            row = []
            for j in range(n):
                if i == 0 or j == n - 1:
                    row.append('.')
                else:
                    row.append('#')
            grid.append(''.join(row))
        return grid
