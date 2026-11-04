"""
Problem: LeetCode 3505 - Minimum Operations to Make Elements Within K Subarrays Equal
Difficulty: Hard
Language: Python (Python 3)
Author: CodeByTushu
"""

from typing import List

class Solution:
    def minOperations(self, nums: List[int], x: int, k: int) -> int:
        n = len(nums)
        
        # Coordinate compression
        vals = sorted(list(set(nums)))
        m = len(vals)
        val_to_idx = {v: i + 1 for i, v in enumerate(vals)}
        idx = [val_to_idx[num] for num in nums]
        
        bc = [0] * (m + 1)
        bs = [0] * (m + 1)
        
        def upd(i: int, c: int, v: int):
            while i <= m:
                bc[i] += c
                bs[i] += v
                i += i & -i
                
        LOG = 1
        while (LOG << 1) <= m:
            LOG <<= 1
            
        cost = [0] * (n - x + 1)
        total = 0
        kth = x // 2 + 1
        
        for i in range(n):
            upd(idx[i], 1, nums[i])
            total += nums[i]
            
            if i >= x:
                upd(idx[i - x], -1, -nums[i - x])
                total -= nums[i - x]
                
            if i >= x - 1:
                pos = 0
                acc_sum = 0
                rem = kth
                pw = LOG
                while pw > 0:
                    np = pos + pw
                    if np <= m and bc[np] < rem:
                        pos = np
                        rem -= bc[np]
                        acc_sum += bs[np]
                    pw >>= 1
                    
                median = vals[pos]
                sum_low = acc_sum + rem * median
                sum_up = total - sum_low
                
                cost[i - x + 1] = median * kth - sum_low + sum_up - median * (x - kth)
                
        INF = float('inf')
        prev = [0] * (n + 1)
        for j in range(1, k + 1):
            cur = [INF] * (n + 1)
            for i in range(1, n + 1):
                cur[i] = cur[i - 1]
                if i >= x and prev[i - x] < INF:
                    cur[i] = min(cur[i], prev[i - x] + cost[i - x])
            prev = cur
            
        return prev[n]
