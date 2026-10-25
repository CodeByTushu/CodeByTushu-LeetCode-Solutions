"""
Problem: LeetCode 1984 - Minimum Difference Between Highest and Lowest of K Scores
Difficulty: Easy
Language: Python
Author: CodeByTushu

Sorting + Sliding Window Approach
Time Complexity: O(n log n)
Space Complexity: O(1) (or O(n) for Timsort)
"""

from typing import List

class Solution:
    def minimumDifference(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0

        nums.sort()
        min_diff = float('inf')

        for i in range(len(nums) - k + 1):
            current_diff = nums[i + k - 1] - nums[i]
            if current_diff < min_diff:
                min_diff = current_diff

        return min_diff
