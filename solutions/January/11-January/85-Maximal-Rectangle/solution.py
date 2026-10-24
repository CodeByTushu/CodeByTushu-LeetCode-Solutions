"""
Problem: LeetCode 85 - Maximal Rectangle
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0

        cols = len(matrix[0])
        heights = [0] * cols
        max_area = 0

        for row in matrix:
            # Update running heights of contiguous '1's for the current row
            for j in range(cols):
                if row[j] == '1':
                    heights[j] += 1
                else:
                    heights[j] = 0

            # Compute largest rectangle in histogram for the current row
            max_area = max(max_area, self._largest_rectangle_area(heights))

        return max_area

    def _largest_rectangle_area(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        extended_heights = heights + [0]

        for i, h in enumerate(extended_heights):
            while stack and extended_heights[stack[-1]] > h:
                height = extended_heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)

        return max_area
