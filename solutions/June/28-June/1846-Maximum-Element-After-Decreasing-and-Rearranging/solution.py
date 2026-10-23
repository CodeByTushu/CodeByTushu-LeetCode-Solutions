"""
Problem: LeetCode 1846 - Maximum Element After Decreasing and Rearranging
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        arr.sort()

        ans = 1

        for i in range(1, len(arr)):
            ans = min(arr[i], ans + 1)

        return ans
