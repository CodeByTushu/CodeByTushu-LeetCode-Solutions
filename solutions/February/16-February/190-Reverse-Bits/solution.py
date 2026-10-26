"""
Problem: LeetCode 190 - Reverse Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0
        for _ in range(32):
            result = (result << 1) | (n & 1)
            n >>= 1
        return result
