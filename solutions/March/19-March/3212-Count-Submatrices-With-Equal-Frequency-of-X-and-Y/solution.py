"""
Problem: LeetCode 3212 - Count Submatrices With Equal Frequency of X and Y
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def numberOfSubmatrices(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        col_x = [0] * n
        col_y = [0] * n
        count = 0

        for i in range(m):
            current_x = 0
            current_y = 0
            for j in range(n):
                if grid[i][j] == 'X':
                    col_x[j] += 1
                elif grid[i][j] == 'Y':
                    col_y[j] += 1

                current_x += col_x[j]
                current_y += col_y[j]

                if current_x == current_y and current_x > 0:
                    count += 1

        return count
