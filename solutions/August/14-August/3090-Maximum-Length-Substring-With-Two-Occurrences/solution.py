"""
Problem: LeetCode 3090 - Maximum Length Substring With Two Occurrences
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maximumLengthSubstring(self, s: str) -> int:
        freq = [0] * 26
        left = 0
        max_len = 0

        for right, ch in enumerate(s):
            c = ord(ch) - ord('a')
            freq[c] += 1

            while freq[c] > 2:
                freq[ord(s[left]) - ord('a')] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
