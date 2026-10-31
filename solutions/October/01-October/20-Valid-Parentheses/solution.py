"""
Problem: LeetCode 20 - Valid Parentheses
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def isValid(self, s: str) -> bool:
        if len(s) % 2 != 0:
            return False
        stack = []
        matching = {')': '(', '}': '{', ']': '['}
        for c in s:
            if c in "({[":
                stack.append(c)
            else:
                if not stack or stack.pop() != matching[c]:
                    return False
        return len(stack) == 0
