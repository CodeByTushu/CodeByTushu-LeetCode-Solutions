"""
Problem: LeetCode 3014 - Minimum Number of Pushes to Type Word I
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def minimumPushes(self, word: str) -> int:
        n = len(word)
        total_cost = 0
        for i in range(n):
            total_cost += (i // 8) + 1
        return total_cost
