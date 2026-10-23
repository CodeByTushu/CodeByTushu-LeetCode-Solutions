"""
Problem: LeetCode 1674 - Minimum Moves to Make Array Complementary
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def minMoves(self, nums: List[int], limit: int) -> int:
        n = len(nums)
        # diff array covering range [2, 2 * limit + 1]
        diff = [0] * (2 * limit + 2)

        # Process each complementary pair
        for i in range(n // 2):
            a = nums[i]
            b = nums[n - 1 - i]
            min_val = min(a, b)
            max_val = max(a, b)

            # By default, achieving any target sum requires 2 moves per pair.
            # 1 move is sufficient for target sum in [min_val + 1, max_val + limit]:
            diff[min_val + 1] -= 1
            diff[max_val + limit + 1] += 1

            # 0 moves are sufficient for target sum exactly equal to a + b:
            diff[a + b] -= 1
            diff[a + b + 1] += 1

        # Prefix sum sweep to determine minimum moves across all target sums x in [2, 2 * limit]
        current_moves = n  # initially 2 moves per pair for n // 2 pairs = n moves
        min_moves = n

        for target_sum in range(2, 2 * limit + 1):
            current_moves += diff[target_sum]
            if current_moves < min_moves:
                min_moves = current_moves

        return min_moves
