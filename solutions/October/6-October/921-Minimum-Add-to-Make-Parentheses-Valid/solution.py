"""
Problem: LeetCode 921 - Minimum Add to Make Parentheses Valid
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def minAddToMakeValid(self, s: str) -> int:
        open_count = 0  # unmatched '('
        add = 0         # unmatched ')'
        for c in s:
            if c == '(':
                open_count += 1
            else:
                if open_count > 0:
                    open_count -= 1
                else:
                    add += 1
        return add + open_count
