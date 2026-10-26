"""
Problem: LeetCode 3634 - Minimum Removals to Balance Array
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def minRemoval(self, nums: List[int], k: int) -> int:
        n = len(nums)
        nums.sort()

        max_kept = 1
        right = 0

        for left in range(n):
            limit = nums[left] * k
            while right < n and nums[right] <= limit:
                right += 1
            max_kept = max(max_kept, right - left)

        return n - max_kept
