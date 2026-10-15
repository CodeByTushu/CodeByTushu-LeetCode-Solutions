from typing import List

"""
Problem: LeetCode 3875 - Construct Uniform Parity Array I
Language: Python 3
Approach: Parity Counting & Arithmetic Analysis
Time Complexity: O(N)
Space Complexity: O(1)
"""

class Solution:
    def uniformArray(self, nums1: List[int]) -> bool:
        odd_count = 0
        even_count = 0
        for x in nums1:
            if x % 2 == 0:
                even_count += 1
            else:
                odd_count += 1

        all_even = (odd_count == 0 or odd_count >= 2)
        all_odd = (even_count == 0 or odd_count >= 1)
        return all_even or all_odd
