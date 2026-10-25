"""
Problem: LeetCode 3315 - Construct the Minimum Bitwise Array II
Difficulty: Medium
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
                # Isolate the lowest set bit of p + 1 and divide by 2 to get
                # the highest set bit in the contiguous trailing 1s of p.
                lowbit = (p + 1) & -(p + 1)
                ans.append(p - (lowbit >> 1))
        return ans
