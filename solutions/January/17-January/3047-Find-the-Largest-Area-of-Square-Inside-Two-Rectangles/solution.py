"""
Problem: LeetCode 3047 - Find the Largest Area of Square Inside Two Rectangles
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def largestSquareArea(
        self, bottomLeft: List[List[int]], topRight: List[List[int]]
    ) -> int:
        max_side = 0
        n = len(bottomLeft)

        for i in range(n):
            for j in range(i + 1, n):
                x_min = max(bottomLeft[i][0], bottomLeft[j][0])
                x_max = min(topRight[i][0], topRight[j][0])
                y_min = max(bottomLeft[i][1], bottomLeft[j][1])
                y_max = min(topRight[i][1], topRight[j][1])

                width = x_max - x_min
                height = y_max - y_min

                if width > 0 and height > 0:
                    side = min(width, height)
                    if side > max_side:
                        max_side = side

        return max_side * max_side
