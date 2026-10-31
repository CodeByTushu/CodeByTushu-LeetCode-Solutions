"""
Problem: LeetCode 2946 - Matrix Similarity After Cyclic Shifts
Difficulty: Easy
Language: Python
Author: CodeByTushu
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
