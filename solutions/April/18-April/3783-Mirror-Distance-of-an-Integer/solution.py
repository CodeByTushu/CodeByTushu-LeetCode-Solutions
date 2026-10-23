"""
Problem: LeetCode 3783 - Mirror Distance of an Integer
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def mirrorDistance(self, n: int) -> int:
        reversed_n = int(str(n)[::-1])
        return abs(n - reversed_n)
