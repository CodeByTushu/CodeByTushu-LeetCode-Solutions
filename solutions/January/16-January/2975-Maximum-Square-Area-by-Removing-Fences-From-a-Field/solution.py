"""
Problem: LeetCode 2975 - Maximum Square Area by Removing Fences From a Field
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def maximizeSquareArea(
        self, m: int, n: int, hFences: List[int], vFences: List[int]
    ) -> int:
        MOD = 1_000_000_007

        # Add boundary fences 1 and m, and 1 and n
        h = sorted(hFences + [1, m])
        v = sorted(vFences + [1, n])

        # Compute all possible horizontal gap sizes
        h_diffs = set()
        for i in range(len(h)):
            for j in range(i + 1, len(h)):
                h_diffs.add(h[j] - h[i])

        # Find the maximum gap size common to both horizontal and vertical
        max_side = -1
        for i in range(len(v)):
            for j in range(i + 1, len(v)):
                diff = v[j] - v[i]
                if diff in h_diffs:
                    if diff > max_side:
                        max_side = diff

        if max_side == -1:
            return -1

        return (max_side * max_side) % MOD
