"""
Problem: LeetCode 2615 - Sum of Distances
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List
from collections import defaultdict


class Solution:
    def distance(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [0] * n

        pos_map = defaultdict(list)
        for i, val in enumerate(nums):
            pos_map[val].append(i)

        for indices in pos_map.values():
            m = len(indices)
            if m <= 1:
                continue

            total_sum = sum(indices)
            left_sum = 0

            for k, idx in enumerate(indices):
                right_sum = total_sum - left_sum - idx
                left_contrib = k * idx - left_sum
                right_contrib = right_sum - (m - 1 - k) * idx
                result[idx] = left_contrib + right_contrib
                left_sum += idx

        return result
