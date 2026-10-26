"""
Problem: LeetCode 761 - Special Binary String
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

class Solution:
    def makeLargestSpecial(self, s: str) -> str:
        if len(s) <= 2:
            return s

        count = 0
        start = 0
        parts = []

        for i, ch in enumerate(s):
            if ch == '1':
                count += 1
            else:
                count -= 1

            if count == 0:
                inner = self.makeLargestSpecial(s[start + 1:i])
                parts.append("1" + inner + "0")
                start = i + 1

        parts.sort(reverse=True)
        return "".join(parts)
