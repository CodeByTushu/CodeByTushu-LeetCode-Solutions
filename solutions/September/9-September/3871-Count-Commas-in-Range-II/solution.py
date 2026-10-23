"""
Problem: LeetCode 3871 - Count Commas in Range II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def countCommas(self, n: int) -> int:
        result = 0
        threshold = 1000

        while threshold <= n:
            result += (n - threshold + 1)
            threshold *= 1000

        return result
