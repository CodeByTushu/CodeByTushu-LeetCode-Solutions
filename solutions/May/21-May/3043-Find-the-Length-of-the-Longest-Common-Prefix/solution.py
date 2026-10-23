"""
Problem: LeetCode 3043 - Find the Length of the Longest Common Prefix
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def longestCommonPrefix(self, arr1: List[int], arr2: List[int]) -> int:
        prefixes = set()

        # Generate and insert all prefixes from arr1
        for val in arr1:
            while val > 0:
                prefixes.add(val)
                val //= 10

        max_length = 0

        # Find the longest matching prefix for numbers in arr2
        for val in arr2:
            while val > 0:
                if val in prefixes:
                    max_length = max(max_length, len(str(val)))
                    break  # Longest prefix for this value found
                val //= 10

        return max_length
