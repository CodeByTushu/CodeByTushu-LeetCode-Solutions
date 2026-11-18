"""
Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def minChanges(self, s: str) -> int:
        changes = 0

        for i in range(0, len(s), 2):
            if s[i] != s[i + 1]:
                changes += 1

        return changes
