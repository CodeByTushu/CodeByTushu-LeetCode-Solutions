"""
Problem: LeetCode 1536 - Minimum Swaps to Arrange a Binary Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minSwaps(self, grid: List[List[int]]) -> int:
        n = len(grid)
        trailing_zeros = []

        # Step 1: Count trailing zeros for each row
        for row in grid:
            count = 0
            for val in reversed(row):
                if val == 0:
                    count += 1
                else:
                    break
            trailing_zeros.append(count)

        swaps = 0

        # Step 2: For each row i, find first row with at least (n - 1 - i) zeros
        for i in range(n):
            required = n - 1 - i
            found_idx = -1
            for j in range(i, n):
                if trailing_zeros[j] >= required:
                    found_idx = j
                    break

            if found_idx == -1:
                return -1

            # Step 3: Shift row to index i
            swaps += found_idx - i
            val = trailing_zeros.pop(found_idx)
            trailing_zeros.insert(i, val)

        return swaps
