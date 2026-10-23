"""
Problem: LeetCode 3120 - Count the Number of Special Characters I
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
class Solution:
    def numberOfSpecialChars(self, word: str) -> int:
        lower_mask = 0
        upper_mask = 0

        for ch in word:
            if 'a' <= ch <= 'z':
                lower_mask |= (1 << (ord(ch) - ord('a')))
            elif 'A' <= ch <= 'Z':
                upper_mask |= (1 << (ord(ch) - ord('A')))

        return (lower_mask & upper_mask).bit_count()
