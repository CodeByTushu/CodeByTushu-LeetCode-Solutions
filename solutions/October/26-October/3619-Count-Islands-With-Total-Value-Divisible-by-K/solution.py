"""
Problem: LeetCode 3619 - Count Islands With Total Value Divisible by K
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def countIslands(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        dr = [1, -1, 0, 0]
        dc = [0, 0, 1, -1]
        count = 0

        for i in range(m):
            for j in range(n):
                if grid[i][j] == 0:
                    continue
                total_sum = grid[i][j]
                grid[i][j] = 0
                stack = [i * n + j]

                while stack:
                    cur = stack.pop()
                    r, c = divmod(cur, n)
                    for d in range(4):
                        nr, nc = r + dr[d], c + dc[d]
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] > 0:
                            total_sum += grid[nr][nc]
                            grid[nr][nc] = 0
                            stack.append(nr * n + nc)

                if total_sum % k == 0:
                    count += 1

        return count
