"""
Problem: 1594. Maximum Non Negative Product in a Matrix
Difficulty: Medium
Language: Python 3

Approach:
Dynamic Programming maintaining both maximum and minimum path products at each cell (i, j).
Since values can be negative, a negative multiplier can turn a minimal product into the maximum.
Path products fit in standard 64-bit integers and Python handles arbitrary-precision arithmetic.

Time Complexity: O(m * n)
Space Complexity: O(m * n) auxiliary space
"""

class Solution:
    def maxProductPath(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        max_prod = [[0] * n for _ in range(m)]
        min_prod = [[0] * n for _ in range(m)]

        max_prod[0][0] = min_prod[0][0] = grid[0][0]

        for j in range(1, n):
            max_prod[0][j] = min_prod[0][j] = max_prod[0][j - 1] * grid[0][j]

        for i in range(1, m):
            max_prod[i][0] = min_prod[i][0] = max_prod[i - 1][0] * grid[i][0]

        for i in range(1, m):
            for j in range(1, n):
                val = grid[i][j]
                candidates = (
                    max_prod[i - 1][j] * val,
                    min_prod[i - 1][j] * val,
                    max_prod[i][j - 1] * val,
                    min_prod[i][j - 1] * val,
                )
                max_prod[i][j] = max(candidates)
                min_prod[i][j] = min(candidates)

        ans = max_prod[m - 1][n - 1]
        if ans < 0:
            return -1

        MOD = 1_000_000_007
        return ans % MOD
