"""
Problem: LeetCode 3360 - Stone Removal Game
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def canAliceWin(self, n: int) -> bool:
        remove = 10
        alice_turn = True

        while n >= remove:
            n -= remove
            remove -= 1
            alice_turn = not alice_turn

        # Agar ab Bob ki turn hai aur wo move nahi kar sakta, toh Alice jeet gayi
        return not alice_turn
