"""
Problem: LeetCode 1385 - Find the Distance Value Between Two Arrays
Difficulty: Easy
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def findTheDistanceValue(self, arr1: List[int], arr2: List[int], d: int) -> int:
        count = 0
        for a in arr1:
            ok = True
            for b in arr2:
                if abs(a - b) <= d:
                    ok = False
                    break
            if ok:
                count += 1
        return count
