"""
Problem: LeetCode 3719 - Longest Balanced Subarray I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        max_len = 0

        # Using a timestamp array for O(1) distinct value checking
        last_seen = [0] * 100001

        for i in range(n):
            if n - i <= max_len:
                break

            distinct_even = 0
            distinct_odd = 0
            iteration = i + 1

            for j in range(i, n):
                val = nums[j]
                if last_seen[val] != iteration:
                    last_seen[val] = iteration
                    if val % 2 == 0:
                        distinct_even += 1
                    else:
                        distinct_odd += 1

                if distinct_even == distinct_odd:
                    max_len = max(max_len, j - i + 1)

        return max_len
