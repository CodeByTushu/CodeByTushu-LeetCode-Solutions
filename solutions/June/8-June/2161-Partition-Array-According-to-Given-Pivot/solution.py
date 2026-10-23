"""
Problem: LeetCode 2161 - Partition Array According to Given Pivot
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def pivotArray(self, nums: List[int], pivot: int) -> List[int]:
        n = len(nums)
        result = [0] * n
        index = 0

        # Elements less than pivot
        for num in nums:
            if num < pivot:
                result[index] = num
                index += 1

        # Elements equal to pivot
        for num in nums:
            if num == pivot:
                result[index] = num
                index += 1

        # Elements greater than pivot
        for num in nums:
            if num > pivot:
                result[index] = num
                index += 1

        return result
