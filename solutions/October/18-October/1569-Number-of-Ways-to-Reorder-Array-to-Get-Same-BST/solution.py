"""
Problem: LeetCode 1569 - Number of Ways to Reorder Array to Get Same BST
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

import math
from typing import List

class Solution:
    def numOfWays(self, nums: List[int]) -> int:
        MOD = 1_000_000_007

        def ways(arr: List[int]) -> int:
            if len(arr) <= 2:
                return 1
            root = arr[0]
            left = [x for x in arr[1:] if x < root]
            right = [x for x in arr[1:] if x > root]
            return (math.comb(len(arr) - 1, len(left)) * ways(left) * ways(right)) % MOD

        return (ways(nums) - 1) % MOD
