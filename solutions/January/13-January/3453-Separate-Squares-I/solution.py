"""
Problem: LeetCode 3453 - Separate Squares I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        total_area = sum(l * l for _, _, l in squares)
        target_area = total_area / 2.0

        low = 0.0
        high = float(max(y + l for _, y, l in squares))

        def get_area_below(y_line: float) -> float:
            area = 0.0
            for _, y, l in squares:
                if y_line > y:
                    h = min(float(l), y_line - y)
                    area += h * l
            return area

        # 80 iterations of binary search for high precision
        for _ in range(80):
            mid = low + (high - low) / 2.0
            if get_area_below(mid) >= target_area:
                high = mid
            else:
                low = mid

        return low
