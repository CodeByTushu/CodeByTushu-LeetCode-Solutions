"""
Problem: LeetCode 1980 - Find Unique Binary String
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        # Cantor's Diagonal Argument:
        # Construct a string where the i-th character is inverted from nums[i][i]
        return "".join('1' if nums[i][i] == '0' else '0' for i in range(len(nums)))
