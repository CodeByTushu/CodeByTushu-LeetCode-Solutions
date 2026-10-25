"""
Problem: LeetCode 1877 - Minimize Maximum Pair Sum in Array
Difficulty: Medium
Language: Python
Author: CodeByTushu

Greedy + Two Pointers Approach (Sorting)
Time Complexity: O(n log n)
Space Complexity: O(1) (or O(n) depending on Timsort implementation)
"""

from typing import List

class Solution:
    def minPairSum(self, nums: List[int]) -> int:
        nums.sort()
        max_pair_sum = 0
        left, right = 0, len(nums) - 1

        while left < right:
            pair_sum = nums[left] + nums[right]
            if pair_sum > max_pair_sum:
                max_pair_sum = pair_sum
            left += 1
            right -= 1

        return max_pair_sum
