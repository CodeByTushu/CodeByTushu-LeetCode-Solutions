"""
Problem: LeetCode 3532 - Path Existence Queries in a Graph I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def pathExistenceQueries(self, n: int, nums: List[int], maxDiff: int, queries: List[List[int]]) -> List[bool]:
        component = [0] * n
        cid = 0

        # Since nums is sorted, non-decreasing order guarantees that
        # any gap > maxDiff splits elements into distinct connected components.
        for i in range(1, n):
            if nums[i] - nums[i - 1] > maxDiff:
                cid += 1
            component[i] = cid

        return [component[u] == component[v] for u, v in queries]
