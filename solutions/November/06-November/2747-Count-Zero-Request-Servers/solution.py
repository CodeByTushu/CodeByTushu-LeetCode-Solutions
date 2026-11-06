"""
Problem: LeetCode 2747 - Count Zero Request Servers
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def countServers(self, n: int, logs: List[List[int]], x: int, queries: List[int]) -> List[int]:
        # Sort logs by timestamp
        logs.sort(key=lambda item: item[1])
        
        qn = len(queries)
        order = sorted(range(qn), key=lambda i: queries[i])
        
        cnt = [0] * (n + 1)
        ans = [0] * qn
        active = 0
        l = 0
        r = 0
        m = len(logs)
        
        for idx in order:
            q = queries[idx]
            
            # Add logs with time <= q
            while r < m and logs[r][1] <= q:
                server = logs[r][0]
                if cnt[server] == 0:
                    active += 1
                cnt[server] += 1
                r += 1
                
            # Remove logs with time < q - x
            while l < r and logs[l][1] < q - x:
                server = logs[l][0]
                cnt[server] -= 1
                if cnt[server] == 0:
                    active -= 1
                l += 1
                
            ans[idx] = n - active
            
        return ans
