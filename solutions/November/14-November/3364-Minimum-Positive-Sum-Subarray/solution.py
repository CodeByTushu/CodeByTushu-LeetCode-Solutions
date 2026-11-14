"""
Problem: LeetCode 3364 - Minimum Positive Sum Subarray
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def minimumSumSubarray(self, nums: List[int], l: int, r: int) -> int:
        n = len(nums)
        ans = float("inf")

        for i in range(n):
            cur_sum = 0
            for j in range(i, n):
                cur_sum += nums[j]
                length = j - i + 1

                if length > r:
                    break
                if length >= l and cur_sum > 0:
                    ans = min(ans, cur_sum)

        return -1 if ans == float("inf") else int(ans)
