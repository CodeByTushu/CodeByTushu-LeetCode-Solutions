"""
Problem: LeetCode 1927 - Sum Game
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def sumGame(self, num: str) -> bool:
        n = len(num)
        half = n // 2

        sum1 = sum(int(c) for c in num[:half] if c != "?")
        sum2 = sum(int(c) for c in num[half:] if c != "?")

        q1 = num[:half].count("?")
        q2 = num[half:].count("?")

        if (q1 + q2) % 2 == 1:
            return True

        diff = sum1 - sum2
        final_diff = diff + 9 * (q1 - q2) // 2

        return final_diff != 0
