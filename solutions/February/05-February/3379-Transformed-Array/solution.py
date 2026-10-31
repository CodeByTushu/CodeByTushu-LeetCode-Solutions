"""
Problem: LeetCode 3379 - Transformed Array
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def constructTransformedArray(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [0] * n

        for i in range(n):
            # Python's modulo operator (%) naturally wraps negative results correctly into [0, n - 1]
            target_index = (i + nums[i]) % n
            result[i] = nums[target_index]

        return result
