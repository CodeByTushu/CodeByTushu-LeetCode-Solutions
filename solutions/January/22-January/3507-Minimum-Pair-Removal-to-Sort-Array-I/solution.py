"""
Problem: LeetCode 3507 - Minimum Pair Removal to Sort Array I
Difficulty: Easy
Language: Python
Author: CodeByTushu

Simulation Approach (Greedy Adjacent Pair Collapse)
Time Complexity: O(n^2)
Space Complexity: O(n)
"""

from typing import List

class Solution:
    def minimumPairRemoval(self, nums: List[int]) -> int:
        arr = list(nums)
        ops = 0

        while not self._is_non_decreasing(arr):
            min_sum = float('inf')
            min_idx = -1

            # Find leftmost adjacent pair with minimum sum
            for i in range(len(arr) - 1):
                pair_sum = arr[i] + arr[i + 1]
                if pair_sum < min_sum:
                    min_sum = pair_sum
                    min_idx = i

            # Replace the pair with their sum
            arr[min_idx] = min_sum
            arr.pop(min_idx + 1)
            ops += 1

        return ops

    def _is_non_decreasing(self, arr: List[int]) -> bool:
        for i in range(len(arr) - 1):
            if arr[i] > arr[i + 1]:
                return False
        return True
