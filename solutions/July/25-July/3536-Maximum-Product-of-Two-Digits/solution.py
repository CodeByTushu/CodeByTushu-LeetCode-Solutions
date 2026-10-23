"""
Problem: LeetCode 3536 - Maximum Product of Two Digits
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxProduct(self, n: int) -> int:
        first = 0
        second = 0
        while n > 0:
            digit = n % 10
            if digit >= first:
                second = first
                first = digit
            elif digit > second:
                second = digit
            n //= 10
        return first * second
