"""
Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minPartitions(self, n: str) -> int:
        for d in "987654321":
            if d in n:
                return int(d)
        return 0
