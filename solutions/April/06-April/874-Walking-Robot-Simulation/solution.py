"""
Problem: LeetCode 874 - Walking Robot Simulation
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        """
        Simulates the walking robot on an infinite 2D plane with obstacles.
        
        Time Complexity: O(C * K + M)
        Space Complexity: O(M)
        """
        obstacle_set = {(ox, oy) for ox, oy in obstacles}

        # 0: North, 1: East, 2: South, 3: West
        dx = [0, 1, 0, -1]
        dy = [1, 0, -1, 0]
        d = 0

        x = 0
        y = 0
        max_dist_sq = 0

        for cmd in commands:
            if cmd == -1:
                d = (d + 1) % 4
            elif cmd == -2:
                d = (d + 3) % 4
            else:
                for _ in range(cmd):
                    nx = x + dx[d]
                    ny = y + dy[d]
                    if (nx, ny) in obstacle_set:
                        break
                    x = nx
                    y = ny
                    max_dist_sq = max(max_dist_sq, x * x + y * y)

        return max_dist_sq
