"""
Problem: LeetCode 2996 - Smallest Missing Integer Greater Than Sequential Prefix Sum
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def missingInteger(self, nums: list[int]) -> int:
        n = len(nums)
        seq_sum = nums[0]
        i = 1
        while i < n and nums[i] == nums[i - 1] + 1:
            seq_sum += nums[i]
            i += 1

        num_set = set(nums)
        while seq_sum in num_set:
            seq_sum += 1

        return seq_sum
