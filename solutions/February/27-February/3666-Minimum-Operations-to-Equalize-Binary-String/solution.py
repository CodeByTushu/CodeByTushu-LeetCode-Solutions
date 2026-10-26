"""
Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

import math

class Solution:
    def minOperations(self, s: str, k: int) -> int:
        n = len(s)
        c0 = s.count('0')
        if c0 == 0:
            return 0

        c1 = n - c0
        best = float('inf')

        # Case 1: Odd m (requires k % 2 == c0 % 2)
        if k % 2 == c0 % 2:
            min_m = math.ceil(c0 / k)
            if n == k:
                if c1 == 0:
                    if min_m % 2 == 0:
                        min_m += 1
                    best = min(best, min_m)
            else:
                min_m = max(min_m, math.ceil(c1 / (n - k)))
                if min_m % 2 == 0:
                    min_m += 1
                best = min(best, min_m)

        # Case 2: Even m (requires c0 % 2 == 0)
        if c0 % 2 == 0:
            min_m = max(2, math.ceil(c0 / k))
            if n > k:
                min_m = max(min_m, math.ceil(c0 / (n - k)))
                if min_m % 2 != 0:
                    min_m += 1
                best = min(best, min_m)

        return -1 if best == float('inf') else best
