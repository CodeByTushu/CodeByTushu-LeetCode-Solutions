"""
Problem: LeetCode 1967 - Number of Strings That Appear as Substrings in Word
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def numOfStrings(self, patterns: List[str], word: str) -> int:
        count = 0

        for pattern in patterns:
            if pattern in word:
                count += 1

        return count
