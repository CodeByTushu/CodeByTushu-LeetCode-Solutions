"""
Problem: LeetCode 3640 - Trionic Array II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def maxSumTrionic(self, nums: List[int]) -> int:
        n = len(nums)

        # left_inc[i]: Maximum sum of a strictly increasing subarray ending at index i
        left_inc = [0] * n
        for i in range(n):
            left_inc[i] = nums[i]
            if i > 0 and nums[i] > nums[i - 1]:
                left_inc[i] = nums[i] + max(0, left_inc[i - 1])

        # right_inc[i]: Maximum sum of a strictly increasing subarray starting at index i
        right_inc = [0] * n
        for i in range(n - 1, -1, -1):
            right_inc[i] = nums[i]
            if i + 1 < n and nums[i] < nums[i + 1]:
                right_inc[i] = nums[i] + max(0, right_inc[i + 1])

        max_sum = float('-inf')
        i = 0

        # Traverse all maximal strictly decreasing segments [p...q]
        while i < n:
            j = i
            while j + 1 < n and nums[j] > nums[j + 1]:
                j += 1

            if j > i:
                p, q = i, j
                # Peak at p requires nums[p - 1] < nums[p]
                # Valley at q requires nums[q] < nums[q + 1]
                if p > 0 and nums[p - 1] < nums[p] and q + 1 < n and nums[q] < nums[q + 1]:
                    dec_sum = sum(nums[p:q + 1])
                    total = left_inc[p - 1] + dec_sum + right_inc[q + 1]
                    if total > max_sum:
                        max_sum = total

            i = max(i + 1, j)

        return max_sum
