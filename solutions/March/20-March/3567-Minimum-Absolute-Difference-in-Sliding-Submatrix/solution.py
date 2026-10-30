"""
Problem: 3567. Minimum Absolute Difference in Sliding Submatrix
Difficulty: Medium
Language: Python 3

Approach:
For every valid top-left corner (i, j) of a k x k submatrix, extract all k^2 elements.
Sort the distinct values or sort all elements and check adjacent unequal elements.
The minimum difference between any two distinct values will always occur between
consecutive distinct elements in the sorted array. If no two distinct values exist, return 0.

Time Complexity: O((m - k + 1) * (n - k + 1) * k^2 * log(k))
Space Complexity: O(k^2) auxiliary space
"""

class Solution:
    def minAbsDiff(self, grid: list[list[int]], k: int) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        rows = m - k + 1
        cols = n - k + 1
        ans = [[0] * cols for _ in range(rows)]

        for i in range(rows):
            for j in range(cols):
                window = [grid[i + r][j + c] for r in range(k) for c in range(k)]
                window.sort()
                min_diff = float('inf')

                for p in range(1, len(window)):
                    if window[p] != window[p - 1]:
                        diff = window[p] - window[p - 1]
                        if diff < min_diff:
                            min_diff = diff

                ans[i][j] = 0 if min_diff == float('inf') else min_diff

        return ans
