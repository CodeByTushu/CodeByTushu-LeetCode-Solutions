"""
Problem: LeetCode 2751 - Robot Collisions
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List


class Solution:
    def survivedRobotsHealths(self, positions: List[int], healths: List[int], directions: str) -> List[int]:
        n = len(positions)
        indices = sorted(range(n), key=lambda i: positions[i])
        stack = []  # stores indices of robots moving 'R'

        for curr in indices:
            if directions[curr] == 'R':
                stack.append(curr)
            else:
                # Robot moving 'L' collides with any 'R' robots in stack
                while stack and healths[curr] > 0:
                    top = stack[-1]
                    if healths[top] < healths[curr]:
                        healths[top] = 0
                        stack.pop()
                        healths[curr] -= 1
                    elif healths[top] > healths[curr]:
                        healths[curr] = 0
                        healths[top] -= 1
                    else:
                        healths[top] = 0
                        healths[curr] = 0
                        stack.pop()

        return [healths[i] for i in range(n) if healths[i] > 0]
