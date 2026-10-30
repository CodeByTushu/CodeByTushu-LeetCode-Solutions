"""
Problem: 3643. Flip Square Submatrix Vertically
Difficulty: Easy
Language: Python 3

Approach:
The square submatrix spans rows [x, x + k - 1] and columns [y, y + k - 1].
Using two row pointers (top at x and bottom at x + k - 1), we swap the submatrix row segments
in-place until the two pointers meet.

Time Complexity: O(k^2)
Space Complexity: O(1) auxiliary space
"""

class Solution:
    def flipSubmatrix(self, grid: list[list[int]], x: int, y: int, k: int) -> list[list[int]]:
        top = x
        bottom = x + k - 1

        while top < bottom:
            for j in range(y, y + k):
                grid[top][j], grid[bottom][j] = grid[bottom][j], grid[top][j]
            top += 1
            bottom -= 1

        return grid
