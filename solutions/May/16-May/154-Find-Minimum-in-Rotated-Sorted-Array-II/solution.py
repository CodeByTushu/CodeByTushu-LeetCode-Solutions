"""
Problem: LeetCode 154 - Find Minimum in Rotated Sorted Array II
Difficulty: Hard
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1

        # Binary search with duplicate handling
        while left < right:
            mid = left + (right - left) // 2

            if nums[mid] > nums[right]:
                # Inflection point is strictly in the right half
                left = mid + 1
            elif nums[mid] < nums[right]:
                # Right half is sorted, inflection point is at mid or in left half
                right = mid
            else:
                # nums[mid] == nums[right]: duplicate detected, safely shrink right boundary
                right -= 1

        return nums[left]
