from typing import List

"""
Problem: LeetCode 3876 - Construct Uniform Parity Array II
Language: Python 3
Approach: Greedy Parity Inversion with Minimum Value Tracking
Time Complexity: O(N)
Space Complexity: O(1)
"""

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
