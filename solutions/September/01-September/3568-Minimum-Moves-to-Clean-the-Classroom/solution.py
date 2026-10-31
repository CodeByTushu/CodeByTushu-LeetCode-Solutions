"""
Problem: LeetCode 3568 - Minimum Moves to Clean the Classroom
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List
from collections import deque

class Solution:
    def minMoves(self, classroom: List[str], energy: int) -> int:
        m = len(classroom)
        n = len(classroom[0])

        start_r, start_c = -1, -1
        litters = []
        is_reset = [[False] * n for _ in range(m)]

        for i in range(m):
            for j in range(n):
                c = classroom[i][j]
                if c == 'S':
                    start_r, start_c = i, j
                elif c == 'L':
                    litters.append((i, j))
                elif c == 'R':
                    is_reset[i][j] = True

        total_litter = len(litters)
        full_mask = (1 << total_litter) - 1

        # Map litter coordinate -> bit index
        litter_index = {
            litters[k][0] * n + litters[k][1]: k
            for k in range(total_litter)
        }

        init_mask = 0
        start_coord = start_r * n + start_c
        if start_coord in litter_index:
            init_mask |= (1 << litter_index[start_coord])

        visited = set()
        visited.add((start_r, start_c, energy, init_mask))

        queue = deque([(start_r, start_c, energy, init_mask, 0)])
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while queue:
            r, c, e, mask, moves = queue.popleft()

            if mask == full_mask:
                return moves

            if e == 0:
                continue

            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and classroom[nr][nc] != 'X':
                    ne = energy if is_reset[nr][nc] else e - 1
                    new_mask = mask
                    n_coord = nr * n + nc
                    if n_coord in litter_index:
                        new_mask |= (1 << litter_index[n_coord])

                    state = (nr, nc, ne, new_mask)
                    if state not in visited:
                        visited.add(state)
                        queue.append((nr, nc, ne, new_mask, moves + 1))

        return -1
