"""
Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minOperations(self, s: str) -> int:
        n = len(s)
        # Count operations needed to match pattern "010101..."
        diff0 = sum(1 for i, ch in enumerate(s) if ch != ('0' if i % 2 == 0 else '1'))
        # Pattern starting with '1' requires exactly (n - diff0) changes
        return min(diff0, n - diff0)
