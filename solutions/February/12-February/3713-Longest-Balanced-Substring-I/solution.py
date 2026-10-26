"""
Problem: LeetCode 3713 - Longest Balanced Substring I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        max_len = 0

        for i in range(n):
            if n - i <= max_len:
                break
            freq = [0] * 26
            distinct = 0
            max_freq = 0

            for j in range(i, n):
                c = ord(s[j]) - ord('a')
                if freq[c] == 0:
                    distinct += 1
                freq[c] += 1
                if freq[c] > max_freq:
                    max_freq = freq[c]

                length = j - i + 1
                if length == distinct * max_freq:
                    if length > max_len:
                        max_len = length

        return max_len
