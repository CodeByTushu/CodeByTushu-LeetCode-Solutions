"""
Problem: LeetCode 2906 - Construct Product Matrix
Difficulty: Medium
Language: Python
Author: CodeByTushu
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
