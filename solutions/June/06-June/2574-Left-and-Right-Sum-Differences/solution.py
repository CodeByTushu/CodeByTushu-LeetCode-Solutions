"""
Problem: LeetCode 2574 - Left and Right Sum Differences
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def leftRightDifference(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [0] * n

        total_sum = sum(nums)
        left_sum = 0
        right_sum = total_sum

        for i in range(n):
            right_sum -= nums[i]
            answer[i] = abs(left_sum - right_sum)
            left_sum += nums[i]

        return answer
