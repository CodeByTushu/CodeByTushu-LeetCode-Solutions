"""
Problem: LeetCode 3660 - Jump Game IX
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def maxValue(self, nums: List[int]) -> List[int]:
        n = len(nums)
        pre_max = [0] * n
        pre_max[0] = nums[0]
        for i in range(1, n):
            pre_max[i] = max(pre_max[i - 1], nums[i])

        ans = [0] * n
        suf_min = float('inf')
        for i in range(n - 1, -1, -1):
            ans[i] = ans[i + 1] if pre_max[i] > suf_min else pre_max[i]
            suf_min = min(suf_min, nums[i])

        return ans
