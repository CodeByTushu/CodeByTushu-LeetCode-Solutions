"""
Problem: LeetCode 2913 - Subarrays Distinct Element Sum of Squares I
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        total = 0
        for i in range(n):
            distinct = set()
            for j in range(i, n):
                distinct.add(nums[j])
                total += len(distinct) ** 2
        return total
