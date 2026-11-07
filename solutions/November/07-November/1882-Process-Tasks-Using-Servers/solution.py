"""
Problem: LeetCode 1882 - Process Tasks Using Servers
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""
from typing import List
import heapq

class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        n = len(servers)
        m = len(tasks)
        
        # free heap: (weight, index)
        free = [(servers[i], i) for i in range(n)]
        heapq.heapify(free)
        
        # busy heap: (free_time, weight, index)
        busy = []
        
        ans = [0] * m
        t = 0
        
        for j in range(m):
            t = max(t, j)
            
            # Release servers that are free by time t
            while busy and busy[0][0] <= t:
                free_time, weight, idx = heapq.heappop(busy)
                heapq.heappush(free, (weight, idx))
                
            # No free server: jump to the earliest free time
            if not free:
                t = busy[0][0]
                while busy and busy[0][0] <= t:
                    free_time, weight, idx = heapq.heappop(busy)
                    heapq.heappush(free, (weight, idx))
                    
            weight, idx = heapq.heappop(free)
            ans[j] = idx
            heapq.heappush(busy, (t + tasks[j], weight, idx))
            
        return ans
