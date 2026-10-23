"""
Problem: LeetCode 1189 - Maximum Number of Balloons
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        freq = [0] * 26

        # Count frequency of each character
        for ch in text:
            freq[ord(ch) - ord('a')] += 1

        # "balloon" -> b=1, a=1, l=2, o=2, n=1
        return min(
            freq[ord('b') - ord('a')],
            freq[ord('a') - ord('a')],
            freq[ord('l') - ord('a')] // 2,
            freq[ord('o') - ord('a')] // 2,
            freq[ord('n') - ord('a')]
        )
