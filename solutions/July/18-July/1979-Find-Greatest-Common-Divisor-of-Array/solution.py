"""
Problem: LeetCode 1979 - Find Greatest Common Divisor of Array
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

import math
from typing import List

class Solution:
    def findGCD(self, nums: List[int]) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return math.gcd(min_val, max_val)
