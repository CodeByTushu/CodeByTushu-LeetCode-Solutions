"""
Problem: LeetCode 2089 - Find Target Indices After Sorting Array
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        less = 0
        equal = 0
        for x in nums:
            if x < target:
                less += 1
            elif x == target:
                equal += 1
        return list(range(less, less + equal))
