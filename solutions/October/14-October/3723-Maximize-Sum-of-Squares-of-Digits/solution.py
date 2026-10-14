"""
Problem: LeetCode 3723 - Maximize Sum of Squares of Digits
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxSumOfSquares(self, num: int, sum: int) -> str:
        if sum > 9 * num:
            return ""
        
        nines = sum // 9
        rem = sum % 9
        zeros = num - nines - (1 if rem > 0 else 0)
        
        if rem > 0:
            return "9" * nines + str(rem) + "0" * zeros
        return "9" * nines + "0" * zeros
