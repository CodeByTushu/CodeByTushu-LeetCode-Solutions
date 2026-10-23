"""
Problem: LeetCode 3300 - Minimum Element After Replacement With Digit Sum
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def minElement(self, nums: List[int]) -> int:
        min_val = float('inf')

        for num in nums:
            digit_sum = 0
            temp = num
            while temp > 0:
                digit_sum += temp % 10
                temp //= 10
            if digit_sum < min_val:
                min_val = digit_sum

        return min_val
