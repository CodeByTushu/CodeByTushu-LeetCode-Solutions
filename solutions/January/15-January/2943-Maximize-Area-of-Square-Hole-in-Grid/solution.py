"""
Problem: LeetCode 2943 - Maximize Area of Square Hole in Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def maximizeSquareHoleArea(
        self, n: int, m: int, hBars: List[int], vBars: List[int]
    ) -> int:

        def get_max_gap(bars: List[int]) -> int:
            bars.sort()
            max_consecutive = 1
            current_consecutive = 1

            for i in range(1, len(bars)):
                if bars[i] == bars[i - 1] + 1:
                    current_consecutive += 1
                else:
                    current_consecutive = 1
                max_consecutive = max(max_consecutive, current_consecutive)

            return max_consecutive + 1

        side = min(get_max_gap(hBars), get_max_gap(vBars))
        return side * side
