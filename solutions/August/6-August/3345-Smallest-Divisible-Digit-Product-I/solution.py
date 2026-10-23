"""
Problem: LeetCode 3345 - Smallest Divisible Digit Product I
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def smallestNumber(self, n: int, t: int) -> int:
        def digit_product(num: int) -> int:
            product = 1
            while num > 0:
                product *= (num % 10)
                num //= 10
            return product

        while True:
            if digit_product(n) % t == 0:
                return n
            n += 1
