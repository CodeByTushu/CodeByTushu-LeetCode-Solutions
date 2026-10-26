"""
Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sortByBits(self, arr: List[int]) -> List[int]:
        return sorted(arr, key=lambda x: (x.bit_count(), x))
