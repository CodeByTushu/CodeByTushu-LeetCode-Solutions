"""
Problem: LeetCode 3116 - Kth Smallest Amount With Single Denomination Combination
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

import math
from typing import List


class Solution:
    def findKthSmallest(self, coins: List[int], k: int) -> int:
        min_coin = min(coins)
        lo, hi = 1, k * min_coin
        n = len(coins)

        def count_up_to(x: int) -> int:
            count = 0
            for mask in range(1, 1 << n):
                lcm_val = 1
                too_big = False
                for i in range(n):
                    if mask & (1 << i):
                        lcm_val = math.lcm(lcm_val, coins[i])
                        if lcm_val > x:
                            too_big = True
                            break
                if too_big:
                    continue
                term = x // lcm_val
                if bin(mask).count("1") % 2 == 1:
                    count += term
                else:
                    count -= term
            return count

        while lo < hi:
            mid = lo + (hi - lo) // 2
            if count_up_to(mid) >= k:
                hi = mid
            else:
                lo = mid + 1

        return lo
