"""
Problem: LeetCode 2243 - Calculate Digit Sum of a String
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            next_chunks = []

            for i in range(0, len(s), k):
                chunk = s[i:i + k]
                digit_sum = sum(int(ch) for ch in chunk)
                next_chunks.append(str(digit_sum))

            s = "".join(next_chunks)

        return s
