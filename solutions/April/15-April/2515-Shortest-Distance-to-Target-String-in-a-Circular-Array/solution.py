"""
Problem: LeetCode 2515 - Shortest Distance to Target String in a Circular Array
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def closestTarget(self, words: List[str], target: str, startIndex: int) -> int:
        n = len(words)
        min_dist = float('inf')

        for i, word in enumerate(words):
            if word == target:
                direct = abs(i - startIndex)
                circular = n - direct
                min_dist = min(min_dist, direct, circular)

        return -1 if min_dist == float('inf') else min_dist
