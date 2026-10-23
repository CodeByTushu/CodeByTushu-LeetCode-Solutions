"""
Problem: LeetCode 2078 - Two Furthest Houses With Different Colors
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxDistance(self, colors: List[int]) -> int:
        n = len(colors)
        max_dist = 0
        
        # The furthest house with a different color must pair with either the first or last house
        for i, c in enumerate(colors):
            if c != colors[0]:
                max_dist = max(max_dist, i)
            if c != colors[-1]:
                max_dist = max(max_dist, n - 1 - i)
                
        return max_dist
