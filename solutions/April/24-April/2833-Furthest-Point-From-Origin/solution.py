"""
Problem: LeetCode 2833 - Furthest Point From Origin
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""


class Solution:
    def furthestDistanceFromOrigin(self, moves: str) -> int:
        count_l = moves.count('L')
        count_r = moves.count('R')
        count_blank = moves.count('_')
        return abs(count_l - count_r) + count_blank
