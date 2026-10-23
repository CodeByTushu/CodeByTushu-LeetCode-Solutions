"""
Problem: LeetCode 3016 - Minimum Number of Pushes to Type Word II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from collections import Counter


class Solution:
    def minimumPushes(self, word: str) -> int:
        freq = Counter(word)
        sorted_counts = sorted(freq.values(), reverse=True)
        
        total_pushes = 0
        for i, count in enumerate(sorted_counts):
            push_count = (i // 8) + 1
            total_pushes += push_count * count
            
        return total_pushes
