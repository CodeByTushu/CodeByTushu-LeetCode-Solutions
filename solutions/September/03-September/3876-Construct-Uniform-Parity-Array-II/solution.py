"""
Problem: LeetCode 3876 - Construct Uniform Parity Array II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def uniformArray(self, nums1: List[int]) -> bool:
        def can_make_all(target_parity: int) -> bool:
            global_min = [float('inf'), float('inf')]
            for x in nums1:
                global_min[x % 2] = min(global_min[x % 2], x)

            for x in nums1:
                cur_parity = x % 2
                if cur_parity == target_parity:
                    continue
                needed_j_parity = (target_parity + cur_parity) % 2
                if global_min[needed_j_parity] >= x:
                    return False
            return True

        return can_make_all(0) or can_make_all(1)
