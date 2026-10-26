"""
Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def concatenatedBinary(self, n: int) -> int:
        ans = 0
        bit_length = 0
        MOD = 1_000_000_007

        for i in range(1, n + 1):
            if (i & (i - 1)) == 0:
                bit_length += 1
            ans = ((ans << bit_length) | i) % MOD

        return ans
