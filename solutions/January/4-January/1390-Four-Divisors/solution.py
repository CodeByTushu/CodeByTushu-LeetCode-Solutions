"""
Problem: LeetCode 1390 - Four Divisors
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sumFourDivisors(self, nums: List[int]) -> int:
        total_sum = 0

        for num in nums:
            count = 0
            curr_sum = 0
            d = 1
            while d * d <= num:
                if num % d == 0:
                    if d * d == num:
                        count += 1
                        curr_sum += d
                    else:
                        count += 2
                        curr_sum += d + (num // d)
                    if count > 4:
                        break
                d += 1

            if count == 4:
                total_sum += curr_sum

        return total_sum
