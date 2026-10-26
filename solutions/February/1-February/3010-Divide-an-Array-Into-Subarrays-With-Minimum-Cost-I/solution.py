"""
Problem: LeetCode 3010 - Divide an Array Into Subarrays With Minimum Cost I
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimumCost(self, nums: List[int]) -> int:
        # The first subarray must start at index 0, fixing nums[0] as its cost.
        # Find the two smallest values in nums[1:] in a single linear scan.
        min1 = float('inf')
        min2 = float('inf')

        for x in nums[1:]:
            if x < min1:
                min2 = min1
                min1 = x
            elif x < min2:
                min2 = x

        return nums[0] + min1 + min2
