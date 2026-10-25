"""
Problem: LeetCode 3314 - Construct the Minimum Bitwise Array I
Difficulty: Easy
Language: Python
Author: CodeByTushu

Bit Manipulation Approach (Trailing 1s Lowbit Clearing)
Time Complexity: O(n)
Space Complexity: O(1) auxiliary (excluding output array)
"""

from typing import List

class Solution:
    def minBitwiseArray(self, nums: List[int]) -> List[int]:
        ans = []
        for p in nums:
            # Even prime (2) cannot be formed by x | (x + 1) because x | (x + 1) is always odd
            if p == 2:
                ans.append(-1)
            else:
                # (p + 1) & -(p + 1) isolates the lowest set bit of p + 1.
                # Right shifting by 1 gives the highest set bit in the trailing 1s block of p.
                lowbit = (p + 1) & -(p + 1)
                ans.append(p - (lowbit >> 1))
        return ans
