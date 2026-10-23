"""
Problem: LeetCode 3754 - Concatenate Non-Zero Digits and Multiply by Sum I
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def sumAndMultiply(self, n: int) -> int:
        if n == 0:
            return 0

        x = 0
        digit_sum = 0

        for ch in str(n):
            if ch != "0":
                digit = ord(ch) - ord("0")
                x = x * 10 + digit
                digit_sum += digit

        return x * digit_sum
