"""
Problem: LeetCode 868 - Binary Gap
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def binaryGap(self, n: int) -> int:
        last_pos = -1
        max_gap = 0
        curr_pos = 0

        while n > 0:
            if n & 1:
                if last_pos != -1:
                    max_gap = max(max_gap, curr_pos - last_pos)
                last_pos = curr_pos
            n >>= 1
            curr_pos += 1

        return max_gap
