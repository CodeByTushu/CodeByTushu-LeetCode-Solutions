"""
Problem: LeetCode 3551 - Minimum Swaps to Sort by Digit Sum
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        def digit_sum(x: int) -> int:
            s = 0
            while x > 0:
                s += x % 10
                x //= 10
            return s

        n = len(nums)
        ds = [digit_sum(x) for x in nums]
        idx = sorted(range(n), key=lambda i: (ds[i], nums[i]))

        visited = [False] * n
        swaps = 0

        for i in range(n):
            if visited[i] or idx[i] == i:
                continue
            cycle_len = 0
            j = i
            while not visited[j]:
                visited[j] = True
                j = idx[j]
                cycle_len += 1
            swaps += cycle_len - 1

        return swaps
