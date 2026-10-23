"""
Problem: LeetCode 1840 - Maximum Building Height
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxBuilding(self, n: int, restrictions: List[List[int]]) -> int:
        r = [[1, 0]]
        for item in restrictions:
            r.append([item[0], item[1]])
        
        has_n = any(item[0] == n for item in r)
        if not has_n:
            r.append([n, n - 1])
            
        r.sort(key=lambda x: x[0])
        m = len(r)
        
        # Left to right pass
        for i in range(1, m):
            dist = r[i][0] - r[i - 1][0]
            r[i][1] = min(r[i][1], r[i - 1][1] + dist)
            
        # Right to left pass
        for i in range(m - 2, -1, -1):
            dist = r[i + 1][0] - r[i][0]
            r[i][1] = min(r[i][1], r[i + 1][1] + dist)
            
        ans = 0
        for i in range(1, m):
            x1, h1 = r[i - 1]
            x2, h2 = r[i]
            dist = x2 - x1
            peak = (h1 + h2 + dist) // 2
            ans = max(ans, peak)
            
        return ans
