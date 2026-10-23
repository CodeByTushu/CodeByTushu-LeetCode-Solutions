"""
Problem: LeetCode 2553 - Separate the Digits in an Array
Difficulty: Easy
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def separateDigits(self, nums: List[int]) -> List[int]:
        ans = []
        for num in nums:
            temp = []
            while num > 0:
                temp.append(num % 10)
                num //= 10
            ans.extend(reversed(temp))
        return ans
