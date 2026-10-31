"""
Problem: LeetCode 3013 - Divide an Array Into Subarrays With Minimum Cost II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List
from sortedcontainers import SortedList


class Solution:
    def minimumCost(self, nums: List[int], k: int, dist: int) -> int:
        n = len(nums)
        m = k - 1

        # Two sorted lists to maintain the m smallest elements dynamically:
        # left: contains the m smallest elements currently in the window
        # right: contains the remaining elements currently in the window
        left = SortedList()
        right = SortedList()
        sum_l = 0

        def add(val: int, idx: int):
            nonlocal sum_l
            p = (val, idx)
            if len(left) < m:
                left.add(p)
                sum_l += val
            else:
                if p < left[-1]:
                    max_l = left.pop()
                    sum_l -= max_l[0]
                    right.add(max_l)

                    left.add(p)
                    sum_l += val
                else:
                    right.add(p)

        def remove(val: int, idx: int):
            nonlocal sum_l
            p = (val, idx)
            if p in left:
                left.remove(p)
                sum_l -= val
                if len(right) > 0:
                    min_r = right.pop(0)
                    left.add(min_r)
                    sum_l += min_r[0]
            else:
                right.remove(p)

        # Initialize the first window of size dist + 1: indices 1 to min(n - 1, 1 + dist)
        for i in range(1, min(n, 2 + dist)):
            add(nums[i], i)

        min_sum = sum_l

        # Slide the window across nums[1 ... n - 1]
        for i in range(2 + dist, n):
            add(nums[i], i)
            remove(nums[i - dist - 1], i - dist - 1)
            min_sum = min(min_sum, sum_l)

        return nums[0] + min_sum
