"""
Problem: LeetCode 1477 - Find Two Non-overlapping Sub-arrays Each With Target Sum
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minSumOfLengths(self, arr: List[int], target: int) -> int:
        n = len(arr)
        best = [float('inf')] * n
        prefix_map = {0: -1}
        
        current_sum = 0
        ans = float('inf')
        cur_best = float('inf')
        
        for i in range(n):
            current_sum += arr[i]
            if (current_sum - target) in prefix_map:
                j = prefix_map[current_sum - target]
                length = i - j
                if j >= 0 and best[j] != float('inf'):
                    ans = min(ans, length + best[j])
                cur_best = min(cur_best, length)
            best[i] = cur_best
            prefix_map[current_sum] = i
            
        return -1 if ans == float('inf') else int(ans)
