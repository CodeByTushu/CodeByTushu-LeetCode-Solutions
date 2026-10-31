"""
Problem: LeetCode 1861 - Rotating the Box
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        m = len(boxGrid)
        n = len(boxGrid[0])

        # Step 1: Simulate gravity row by row (falling to the right)
        for i in range(m):
            empty_slot = n - 1
            for j in range(n - 1, -1, -1):
                if boxGrid[i][j] == '*':
                    empty_slot = j - 1
                elif boxGrid[i][j] == '#':
                    boxGrid[i][j] = '.'
                    boxGrid[i][empty_slot] = '#'
                    empty_slot -= 1

        # Step 2: Rotate 90 degrees clockwise into an n x m grid
        res = [[''] * m for _ in range(n)]
        for i in range(m):
            for j in range(n):
                res[j][m - 1 - i] = boxGrid[i][j]

        return res
