"""
Problem: LeetCode 1266 - Minimum Time Visiting All Points
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minTimeToVisitAllPoints(self, points: List[List[int]]) -> int:
        total_time = 0

        for i in range(1, len(points)):
            dx = abs(points[i][0] - points[i - 1][0])
            dy = abs(points[i][1] - points[i - 1][1])
            # Chebyshev distance: max(|dx|, |dy|)
            total_time += max(dx, dy)

        return total_time
