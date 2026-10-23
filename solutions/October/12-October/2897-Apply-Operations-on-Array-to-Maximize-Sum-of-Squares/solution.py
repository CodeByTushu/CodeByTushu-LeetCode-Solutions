"""
Problem: LeetCode 2897 - Apply Operations on Array to Maximize Sum of Squares
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxSum(self, nums: List[int], k: int) -> int:
        MOD = 1_000_000_007
        cnt = [0] * 30

        for num in nums:
            for b in range(30):
                if (num >> b) & 1:
                    cnt[b] += 1

        ans = 0
        for _ in range(k):
            cur = 0
            for b in range(30):
                if cnt[b] > 0:
                    cur |= (1 << b)
                    cnt[b] -= 1
            ans = (ans + cur * cur) % MOD

        return ans
