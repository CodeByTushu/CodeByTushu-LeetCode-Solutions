"""
Problem: 3212. Count Submatrices With Equal Frequency of X and Y
Difficulty: Medium
Language: Python 3

Approach:
Every submatrix containing grid[0][0] has top-left corner at (0, 0) and bottom-right corner at (i, j).
We maintain running column prefix counts of 'X' and 'Y'. As we process row i,
accumulating column sums yields the total counts of 'X' and 'Y' in submatrix (0, 0) to (i, j).
A submatrix is valid if countX == countY and countX > 0.

Time Complexity: O(m * n)
Space Complexity: O(n) auxiliary space
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
