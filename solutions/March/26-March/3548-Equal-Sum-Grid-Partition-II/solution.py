"""
Problem: 3548. Equal Sum Grid Partition II
Difficulty: Hard
Language: Python 3

Approach:
Determine if a horizontal or vertical cut can partition the grid into two non-empty
sections of equal sum directly or by discounting at most one cell such that the discounted
section remains connected.

We test horizontal cuts across 4 transformations (original, reverse rows, transpose, reverse transposed).
For any section with dimensions >= 2 x 2, removing any cell preserves connectivity.
For a 1 x C row (C > 1), only the 2 endpoints can be removed.
For an R x 1 column (R > 1), only the 2 endpoints can be removed.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

class Solution:
    def canPartitionGrid(self, grid: list[list[int]]) -> bool:
        total_sum = sum(sum(row) for row in grid)

        def can_partition(g: list[list[int]]) -> bool:
            R = len(g)
            C = len(g[0])
            top_sum = 0
            seen = set()

            for i in range(R - 1):
                for j in range(C):
                    seen.add(g[i][j])
                    top_sum += g[i][j]

                bot_sum = total_sum - top_sum
                diff = top_sum - bot_sum

                if diff == 0:
                    return True

                if diff > 0:
                    if i == 0:
                        if C > 1 and (diff == g[0][0] or diff == g[0][C - 1]):
                            return True
                    elif C == 1:
                        if diff == g[0][0] or diff == g[i][0]:
                            return True
                    else:
                        if diff in seen:
                            return True

            return False

        def reverse_rows(g: list[list[int]]) -> list[list[int]]:
            return g[::-1]

        def transpose(g: list[list[int]]) -> list[list[int]]:
            return [list(col) for col in zip(*g)]

        return (
            can_partition(grid) or
            can_partition(reverse_rows(grid)) or
            can_partition(transpose(grid)) or
            can_partition(reverse_rows(transpose(grid)))
        )
