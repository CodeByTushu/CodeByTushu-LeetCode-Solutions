"""
Problem: 2906. Construct Product Matrix
Difficulty: Medium
Language: Python 3

Approach:
Compute prefix and suffix products in row-major order modulo 12345.
Avoids division since 12345 is not prime and elements may share factors with 12345.

Time Complexity: O(n * m)
Space Complexity: O(1) auxiliary space (excluding output matrix)
"""

class Solution:
    def constructProductMatrix(self, grid: list[list[int]]) -> list[list[int]]:
        n, m = len(grid), len(grid[0])
        MOD = 12345
        p = [[0] * m for _ in range(n)]

        prefix = 1
        for i in range(n):
            for j in range(m):
                p[i][j] = prefix
                prefix = (prefix * (grid[i][j] % MOD)) % MOD

        suffix = 1
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                p[i][j] = (p[i][j] * suffix) % MOD
                suffix = (suffix * (grid[i][j] % MOD)) % MOD

        return p
