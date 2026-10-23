"""
Problem: LeetCode 2784 - Check if Array is Good
Difficulty: Easy
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def isGood(self, nums: List[int]) -> bool:
        n = len(nums) - 1
        if n < 1:
            return False

        count = [0] * (n + 1)
        for num in nums:
            if num < 1 or num > n:
                return False
            count[num] += 1

        # Each number from 1 to n - 1 must appear exactly once
        for i in range(1, n):
            if count[i] != 1:
                return False

        # The number n must appear exactly twice
        return count[n] == 2
