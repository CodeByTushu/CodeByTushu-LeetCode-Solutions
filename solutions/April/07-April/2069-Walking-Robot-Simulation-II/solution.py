"""
Problem: LeetCode 2069 - Walking Robot Simulation II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Robot:
    """
    Simulates a robot moving along the perimeter of a grid.
    
    Time Complexity:
        - __init__: O(W + H)
        - step: O(1)
        - getPos: O(1)
        - getDir: O(1)
    Space Complexity: O(W + H)
    """

    def __init__(self, width: int, height: int):
        self.perimeter = 2 * (width + height) - 4
        self.coords = []
        self.dirs = []
        self.idx = 0
        self.moved = False

        # Bottom row
        for i in range(width):
            self.coords.append([i, 0])
            self.dirs.append("East")
        # Right column
        for j in range(1, height):
            self.coords.append([width - 1, j])
            self.dirs.append("North")
        # Top row
        for i in range(width - 2, -1, -1):
            self.coords.append([i, height - 1])
            self.dirs.append("West")
        # Left column
        for j in range(height - 2, 0, -1):
            self.coords.append([0, j])
            self.dirs.append("South")

        self.dirs[0] = "South"

    def step(self, num: int) -> None:
        self.moved = True
        self.idx = (self.idx + num) % self.perimeter

    def getPos(self) -> List[int]:
        return self.coords[self.idx]

    def getDir(self) -> str:
        if not self.moved:
            return "East"
        return self.dirs[self.idx]
