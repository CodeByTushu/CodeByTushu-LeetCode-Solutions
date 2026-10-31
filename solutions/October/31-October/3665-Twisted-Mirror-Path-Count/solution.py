"""
Problem: LeetCode 3665 - Twisted Mirror Path Count
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def uniquePaths(self, grid: List[List[int]]) -> int:
        MOD = 1_000_000_007
        m, n = len(grid), len(grid[0])
        
        # f[i][j][0]: ways entering (i, j) moving Right
        # f[i][j][1]: ways entering (i, j) moving Down
        f = [[[0, 0] for _ in range(n + 1)] for _ in range(m + 1)]
        f[0][0][0] = 1
        
        for i in range(m):
            for j in range(n):
                from_right = f[i][j][0]
                from_down = f[i][j][1]
                
                if grid[i][j] == 0:
                    total = (from_right + from_down) % MOD
                    # move right -> enters (i, j + 1) horizontally
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD
                    # move down -> enters (i + 1, j) vertically
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD
                else:
                    # entered moving right -> reflected down into (i + 1, j)
                    f[i + 1][j][1] = (f[i + 1][j][1] + from_right) % MOD
                    # entered moving down -> reflected right into (i, j + 1)
                    f[i][j + 1][0] = (f[i][j + 1][0] + from_down) % MOD
                    
        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD
