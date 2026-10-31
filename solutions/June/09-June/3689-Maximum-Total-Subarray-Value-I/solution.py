"""
Problem: LeetCode 3689 - Maximum Total Subarray Value I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return (max_val - min_val) * k
