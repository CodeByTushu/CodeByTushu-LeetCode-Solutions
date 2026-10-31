"""
Problem: LeetCode 3548 - Equal Sum Grid Partition II
Difficulty: Hard
Language: Python
Author: CodeByTushu
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
