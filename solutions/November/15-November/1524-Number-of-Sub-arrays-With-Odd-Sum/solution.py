"""
Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        MOD = 1_000_000_007

        odd = 0
        even = 1
        prefix = 0
        ans = 0

        for x in arr:
            prefix = (prefix + x) % 2

            if prefix == 1:
                ans += even
                odd += 1
            else:
                ans += odd
                even += 1

            ans %= MOD

        return ans
