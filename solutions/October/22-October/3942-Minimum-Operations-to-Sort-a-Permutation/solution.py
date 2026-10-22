from typing import List

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        best = float('inf')
        
        # Check if array is cyclically ascending
        s = nums[0]
        asc = all(nums[i] == (i + s) % n for i in range(n))
        if asc:
            if s == 0:
                return 0
            best = min(best, n - s, s + 2)
            
        # Check if array is cyclically descending
        c = nums[0]
        desc = all(nums[i] == ((c - i) % n + n) % n for i in range(n))
        if desc:
            t = (c + 1) % n
            best = min(best, min(t, n - t) + 1)
            
        return -1 if best == float('inf') else best
