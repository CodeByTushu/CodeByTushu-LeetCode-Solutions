"""
Problem: LeetCode 693 - Binary Number with Alternating Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def hasAlternatingBits(self, n: int) -> bool:
        x = n ^ (n >> 1)
        return (x & (x + 1)) == 0
