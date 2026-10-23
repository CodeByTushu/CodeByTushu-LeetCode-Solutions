"""
Problem: LeetCode 1111 - Maximum Nesting Depth of Two Valid Parentheses Strings
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxDepthAfterSplit(self, seq: str) -> list[int]:
        n = len(seq)
        ans = [0] * n
        depth = 0

        for i, char in enumerate(seq):
            if char == '(':
                depth += 1
                ans[i] = depth % 2
            else:
                ans[i] = depth % 2
                depth -= 1

        return ans
