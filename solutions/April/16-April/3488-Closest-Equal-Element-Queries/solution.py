"""
Problem: LeetCode 3488 - Closest Equal Element Queries
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def solveQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        n = len(nums)
        # minDist[i] stores the minimum circular distance to an identical element
        min_dist = [n] * n
        last_seen = {}
        
        # Traverse the circular array twice to capture all adjacent pairs & wrap-around
        for i in range(2 * n):
            index = i % n
            val = nums[index]
            
            if val in last_seen:
                prev_idx = last_seen[val] % n
                d = i - last_seen[val]
                if d < min_dist[index]:
                    min_dist[index] = d
                if d < min_dist[prev_idx]:
                    min_dist[prev_idx] = d
            last_seen[val] = i
            
        return [-1 if min_dist[q] == n else min_dist[q] for q in queries]
