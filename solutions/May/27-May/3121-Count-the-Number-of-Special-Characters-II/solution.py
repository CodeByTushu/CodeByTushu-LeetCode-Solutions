"""
Problem: LeetCode 3121 - Count the Number of Special Characters II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def numberOfSpecialChars(self, word: str) -> int:
        last_lower = [-1] * 26
        first_upper = [-1] * 26

        for i, ch in enumerate(word):
            if 'a' <= ch <= 'z':
                last_lower[ord(ch) - ord('a')] = i
            elif 'A' <= ch <= 'Z':
                idx = ord(ch) - ord('A')
                if first_upper[idx] == -1:
                    first_upper[idx] = i

        special_count = 0
        for i in range(26):
            if last_lower[i] != -1 and first_upper[i] != -1 and last_lower[i] < first_upper[i]:
                special_count += 1

        return special_count
