"""
Problem: LeetCode 1009 - Complement of Base 10 Integer
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def bitwiseComplement(self, n: int) -> int:
        if n == 0:
            return 1

        # Smear highest set bit downwards to create a bitmask of all 1s
        mask = n
        mask |= mask >> 1
        mask |= mask >> 2
        mask |= mask >> 4
        mask |= mask >> 8
        mask |= mask >> 16

        return mask ^ n
