"""
Problem: LeetCode 22 - Generate Parentheses
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []

        def backtrack(current: list, open_count: int, close_count: int):
            if len(current) == 2 * n:
                result.append("".join(current))
                return

            if open_count < n:
                current.append('(')
                backtrack(current, open_count + 1, close_count)
                current.pop()

            if close_count < open_count:
                current.append(')')
                backtrack(current, open_count, close_count + 1)
                current.pop()

        backtrack([], 0, 0)
        return result
