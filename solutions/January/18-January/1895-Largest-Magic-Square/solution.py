"""
Problem: LeetCode 1895 - Largest Magic Square
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def largestMagicSquare(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])

        # Prefix sums for rows
        row_sum = [[0] * (n + 1) for _ in range(m)]
        for r in range(m):
            for c in range(n):
                row_sum[r][c + 1] = row_sum[r][c] + grid[r][c]

        # Prefix sums for columns
        col_sum = [[0] * n for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                col_sum[r + 1][c] = col_sum[r][c] + grid[r][c]

        def is_magic(r: int, c: int, k: int) -> bool:
            target = row_sum[r][c + k] - row_sum[r][c]

            # Check rows
            for i in range(1, k):
                if row_sum[r + i][c + k] - row_sum[r + i][c] != target:
                    return False

            # Check columns
            for j in range(k):
                if col_sum[r + k][c + j] - col_sum[r][c + j] != target:
                    return False

            # Check main diagonal
            d1 = sum(grid[r + i][c + i] for i in range(k))
            if d1 != target:
                return False

            # Check anti-diagonal
            d2 = sum(grid[r + i][c + k - 1 - i] for i in range(k))
            if d2 != target:
                return False

            return True

        for k in range(min(m, n), 1, -1):
            for r in range(m - k + 1):
                for c in range(n - k + 1):
                    if is_magic(r, c, k):
                        return k

        return 1
