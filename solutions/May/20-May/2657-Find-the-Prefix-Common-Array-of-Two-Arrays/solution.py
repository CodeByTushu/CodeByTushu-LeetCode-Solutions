"""
Problem: LeetCode 2657 - Find the Prefix Common Array of Two Arrays
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def findThePrefixCommonArray(self, A: List[int], B: List[int]) -> List[int]:
        n = len(A)
        C = [0] * n
        freq = [0] * (n + 1)
        common_count = 0

        for i in range(n):
            freq[A[i]] += 1
            if freq[A[i]] == 2:
                common_count += 1

            freq[B[i]] += 1
            if freq[B[i]] == 2:
                common_count += 1

            C[i] = common_count

        return C
