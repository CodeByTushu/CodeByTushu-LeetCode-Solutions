"""
Problem: LeetCode 3513 - Number of Unique XOR Triplets I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def uniqueXorTriplets(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return 1
        if n == 2:
            return 2
        ans = 1
        while ans <= n:
            ans <<= 1
        return ans
