"""
Problem: LeetCode 3517 - Smallest Palindromic Rearrangement I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def smallestPalindrome(self, s: str) -> str:
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1

        left = []
        middle = ""
        for i in range(26):
            while freq[i] >= 2:
                left.append(chr(ord('a') + i))
                freq[i] -= 2
            if freq[i] == 1:
                middle = chr(ord('a') + i)

        left_str = "".join(left)
        right_str = left_str[::-1]
        return left_str + middle + right_str
