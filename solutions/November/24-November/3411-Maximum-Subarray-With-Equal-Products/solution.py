"""
Problem: LeetCode 3411 - Maximum Subarray With Equal Products
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""
import math

class Solution:
    def maxLength(self, nums: list[int]) -> int:
        n = len(nums)
        ans = 0

        for i in range(n):
            prod = 1
            g = 0
            l = 1

            for j in range(i, n):
                prod *= nums[j]
                g = math.gcd(g, nums[j])
                l = math.lcm(l, nums[j])

                if prod == l * g:
                    ans = max(ans, j - i + 1)

        return ans
