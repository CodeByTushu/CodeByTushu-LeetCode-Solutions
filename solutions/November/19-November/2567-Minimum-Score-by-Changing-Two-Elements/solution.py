"""
Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimizeSum(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)

        # Low score can always be 0 by making two elements identical.
        # Thus, we only need to minimize the high score (max - min) after modifying 2 elements.
        opt1 = nums[n - 1] - nums[2]     # Modify 2 smallest elements
        opt2 = nums[n - 2] - nums[1]     # Modify 1 smallest + 1 largest element
        opt3 = nums[n - 3] - nums[0]     # Modify 2 largest elements

        return min(opt1, opt2, opt3)
