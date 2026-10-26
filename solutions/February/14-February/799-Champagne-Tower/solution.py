"""
Problem: LeetCode 799 - Champagne Tower
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        tower = [[0.0] * (r + 1) for r in range(query_row + 2)]
        tower[0][0] = float(poured)

        for r in range(query_row + 1):
            for c in range(r + 1):
                if tower[r][c] > 1.0:
                    overflow = (tower[r][c] - 1.0) / 2.0
                    tower[r + 1][c] += overflow
                    tower[r + 1][c + 1] += overflow

        return min(1.0, tower[query_row][query_glass])
