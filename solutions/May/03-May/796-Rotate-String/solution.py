"""
Problem: LeetCode 796 - Rotate String
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        return len(s) == len(goal) and goal in (s + s)
