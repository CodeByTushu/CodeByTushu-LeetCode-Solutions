"""
Problem: LeetCode 3761 - Minimum Absolute Distance Between Mirror Pairs
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minMirrorPairDistance(self, nums: List[int]) -> int:
        def reverse(x: int) -> int:
            rev = 0
            while x > 0:
                rev = rev * 10 + (x % 10)
                x //= 10
            return rev

        last_seen = {}
        min_dist = float('inf')

        for j, val in enumerate(nums):
            # Check if nums[j] matches reverse(nums[i]) from an earlier index i
            if val in last_seen:
                dist = j - last_seen[val]
                if dist < min_dist:
                    min_dist = dist
                    if min_dist == 1:
                        return 1

            # Record reverse(nums[j]) with its current index j
            rev = reverse(val)
            if rev <= 10**9:
                last_seen[rev] = j

        return -1 if min_dist == float('inf') else min_dist
