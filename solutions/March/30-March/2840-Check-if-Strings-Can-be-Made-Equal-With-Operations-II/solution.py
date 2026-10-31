"""
Problem: LeetCode 2840 - Check if Strings Can be Made Equal With Operations II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from collections import Counter

class Solution:
    def checkStrings(self, s1: str, s2: str) -> bool:
        return (
            Counter(s1[0::2]) == Counter(s2[0::2]) and
            Counter(s1[1::2]) == Counter(s2[1::2])
        )
