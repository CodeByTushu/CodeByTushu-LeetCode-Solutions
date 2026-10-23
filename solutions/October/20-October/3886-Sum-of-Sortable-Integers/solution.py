"""
Problem: LeetCode 3886 - Sum of Sortable Integers
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sortableIntegers(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0

        def is_sortable(k: int) -> bool:
            prev_max = 0
            for start in range(0, n, k):
                end = start + k
                mn = float('inf')
                mx = float('-inf')
                desc = 0
                for i in range(start, end):
                    val = nums[i]
                    if val < mn:
                        mn = val
                    if val > mx:
                        mx = val
                    next_idx = i + 1 if i + 1 < end else start
                    if nums[i] > nums[next_idx]:
                        desc += 1
                if desc > 1:
                    return False
                if mn < prev_max:
                    return False
                prev_max = mx
            return True

        for k in range(1, n + 1):
            if n % k != 0:
                continue
            if is_sortable(k):
                ans += k

        return ans
