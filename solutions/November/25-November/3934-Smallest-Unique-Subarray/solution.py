"""
Problem: LeetCode 3934 - Smallest Unique Subarray
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""
import random

class Solution:
    def smallestUniqueSubarray(self, nums: list[int]) -> int:
        n = len(nums)
        MOD = (1 << 61) - 1
        base = 1000003 + random.randint(1, 1000000)

        h = [0] * (n + 1)
        pw = [1] * (n + 1)
        for i in range(n):
            h[i + 1] = (h[i] * base + nums[i]) % MOD
            pw[i + 1] = (pw[i] * base) % MOD

        def has_unique(L: int) -> bool:
            m = n - L + 1
            pw_L = pw[L]
            arr = []
            for i in range(m):
                v = (h[i + L] - h[i] * pw_L) % MOD
                arr.append(v)
            arr.sort()

            for i in range(m):
                same_left = i > 0 and arr[i] == arr[i - 1]
                same_right = i < m - 1 and arr[i] == arr[i + 1]
                if not same_left and not same_right:
                    return True
            return False

        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if has_unique(mid):
                hi = mid
            else:
                lo = mid + 1

        return lo
