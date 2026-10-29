"""
Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def checkOnesSegment(self, s: str) -> bool:
        # Since s has no leading zeros, s starts with '1'.
        # A second segment of '1's would require a '0' followed by a '1' ("01").
        return "01" not in s
