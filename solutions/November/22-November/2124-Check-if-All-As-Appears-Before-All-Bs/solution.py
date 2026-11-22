"""
Problem: LeetCode 2124 - Check if All A's Appears Before All B's
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""
class Solution:
    def checkString(self, s: str) -> bool:
        # Agar "ba" substring present hai, toh 'a' kisi 'b' ke baad appear ho raha hai
        return "ba" not in s
