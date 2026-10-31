"""
Problem: LeetCode 657 - Robot Return to Origin
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        """
        Determines whether the robot returns to the origin (0, 0) after all moves.
        
        Time Complexity: O(N)
        Space Complexity: O(1)
        """
        x = 0
        y = 0

        for move in moves:
            if move == 'U':
                y += 1
            elif move == 'D':
                y -= 1
            elif move == 'R':
                x += 1
            elif move == 'L':
                x -= 1

        return x == 0 and y == 0
