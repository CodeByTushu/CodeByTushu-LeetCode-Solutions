"""
Problem: LeetCode 678 - Valid Parenthesis String
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def checkValidString(self, s: str) -> bool:
        lo = 0
        hi = 0
        for c in s:
            if c == '(':
                lo += 1
                hi += 1
            elif c == ')':
                lo -= 1
                hi -= 1
            else:  # '*'
                lo -= 1
                hi += 1
            if hi < 0:
                return False
            if lo < 0:
                lo = 0
        return lo == 0
