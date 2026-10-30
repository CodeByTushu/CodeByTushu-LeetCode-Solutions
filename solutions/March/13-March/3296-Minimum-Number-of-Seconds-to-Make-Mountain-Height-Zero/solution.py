"""
Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

import math
from typing import List

class Solution:
    def minNumberOfSeconds(self, mountainHeight: int, workerTimes: List[int]) -> int:
        min_w = min(workerTimes)
        low = 1
        # Upper bound: fastest worker alone reduces the entire mountain
        high = min_w * mountainHeight * (mountainHeight + 1) // 2
        ans = high

        def can_reduce(t: int) -> bool:
            total_height = 0
            for w in workerTimes:
                m = t // w
                if m > 0:
                    # Solve x * (x + 1) // 2 <= m
                    x = int((math.isqrt(1 + 8 * m) - 1) // 2)
                    total_height += x
                    if total_height >= mountainHeight:
                        return True
            return total_height >= mountainHeight

        while low <= high:
            mid = (low + high) // 2
            if can_reduce(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
