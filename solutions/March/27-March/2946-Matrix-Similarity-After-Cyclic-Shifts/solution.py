"""
Problem: 2946. Matrix Similarity After Cyclic Shifts
Difficulty: Easy
Language: Python 3

Approach:
Even rows shift left by k, odd rows shift right by k.
An array of length n is invariant under cyclic shifts of k if and only if
mat[i][j] == mat[i][(j + k) % n] for all j.
We take k %= n and verify this equivalence directly for all cells.

Time Complexity: O(m * n)
Space Complexity: O(1) auxiliary space
"""

class Solution:
    def areSimilar(self, mat: list[list[int]], k: int) -> bool:
        m = len(mat)
        n = len(mat[0])
        k %= n

        if k == 0:
            return True

        for i in range(m):
            for j in range(n):
                if mat[i][j] != mat[i][(j + k) % n]:
                    return False

        return True
