"""
Problem: LeetCode 3312 - Sorted GCD Pair Queries
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

import bisect
from typing import List

class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        max_val = max(nums)
        freq = [0] * (max_val + 1)
        for x in nums:
            freq[x] += 1

        cnt = [0] * (max_val + 1)
        for g in range(1, max_val + 1):
            c = sum(freq[g::g])
            cnt[g] = c * (c - 1) // 2

        exact = list(cnt)
        for g in range(max_val, 0, -1):
            for j in range(g * 2, max_val + 1, g):
                exact[g] -= exact[j]

        prefix = [0] * (max_val + 1)
        for g in range(1, max_val + 1):
            prefix[g] = prefix[g - 1] + exact[g]

        ans = []
        for q in queries:
            k = q + 1
            idx = bisect.bisect_left(prefix, k)
            ans.append(idx)

        return ans
