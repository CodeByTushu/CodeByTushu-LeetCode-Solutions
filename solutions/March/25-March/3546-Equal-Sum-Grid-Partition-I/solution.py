"""
Problem: 3546. Equal Sum Grid Partition I
Difficulty: Medium
Language: Python 3

Approach:
Check if a horizontal or vertical cut can split the grid into two non-empty sections with equal sums.
Total sum must be even. Check running row sums and column sums against totalSum // 2.

Time Complexity: O(m * n)
Space Complexity: O(m + n) auxiliary space
"""

class Solution:
    def canPartitionGrid(self, grid: list[list[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        row_sums = [0] * m
        col_sums = [0] * n
        total_sum = 0

        for i in range(m):
            for j in range(n):
                val = grid[i][j]
                total_sum += val
                row_sums[i] += val
                col_sums[j] += val

        if total_sum % 2 != 0:
            return False

        target = total_sum // 2

        running_row = 0
        for i in range(m - 1):
            running_row += row_sums[i]
            if running_row == target:
                return True

        running_col = 0
        for j in range(n - 1):
            running_col += col_sums[j]
            if running_col == target:
                return True

        return False
