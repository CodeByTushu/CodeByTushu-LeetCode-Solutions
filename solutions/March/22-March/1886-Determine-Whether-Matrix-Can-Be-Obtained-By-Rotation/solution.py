"""
Problem: 1886. Determine Whether Matrix Can Be Obtained By Rotation
Difficulty: Easy
Language: Python 3

Approach:
Test all 4 rotation states (0, 90, 180, and 270 degrees clockwise) in a single pass
using coordinate transformations:
- 0 deg:   mat[i][j] == target[i][j]
- 90 deg:  mat[i][j] == target[j][n - 1 - i]
- 180 deg: mat[i][j] == target[n - 1 - i][n - 1 - j]
- 270 deg: mat[i][j] == target[n - 1 - j][i]
Return True if any orientation matches.

Time Complexity: O(n^2)
Space Complexity: O(1) auxiliary space
"""

class Solution:
    def findRotation(self, mat: list[list[int]], target: list[list[int]]) -> bool:
        n = len(mat)
        r0 = r90 = r180 = r270 = True

        for i in range(n):
            for j in range(n):
                if mat[i][j] != target[i][j]:
                    r0 = False
                if mat[i][j] != target[j][n - 1 - i]:
                    r90 = False
                if mat[i][j] != target[n - 1 - i][n - 1 - j]:
                    r180 = False
                if mat[i][j] != target[n - 1 - j][i]:
                    r270 = False

        return r0 or r90 or r180 or r270
