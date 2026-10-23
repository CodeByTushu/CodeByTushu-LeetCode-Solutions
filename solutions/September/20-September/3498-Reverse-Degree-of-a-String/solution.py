"""
Problem: LeetCode 3498 - Reverse Degree of a String
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def reverseDegree(self, s: str) -> int:
        result = 0
        for i, ch in enumerate(s):
            reversed_alphabet_pos = 26 - (ord(ch) - ord('a'))
            string_pos = i + 1
            result += reversed_alphabet_pos * string_pos
        return result
