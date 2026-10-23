"""
Problem: LeetCode 3499 - Maximize Active Section with Trade I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxActiveSectionsAfterTrade(self, s: str) -> int:
        n = len(s)
        ones = 0
        max_merge = 0
        prev_zero_block = -float("inf")

        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1

            length = j - i
            if s[i] == "1":
                ones += length
            else:
                max_merge = max(max_merge, prev_zero_block + length)
                prev_zero_block = length

            i = j

        return int(ones + max_merge)
