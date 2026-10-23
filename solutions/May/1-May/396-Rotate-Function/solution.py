"""
Problem: LeetCode 396 - Rotate Function
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        n = len(nums)
        total_sum = sum(nums)
        current_f = sum(i * val for i, val in enumerate(nums))
        max_f = current_f

        for k in range(1, n):
            current_f += total_sum - n * nums[n - k]
            if current_f > max_f:
                max_f = current_f

        return max_f
