class Solution:
    def minOperations(self, s: str) -> int:
        n = len(s)
        
        # Check if already sorted
        if all(s[i - 1] <= s[i] for i in range(1, n)):
            return 0
            
        # If n == 2 and not sorted, no proper substring can fix it
        if n == 2:
            return -1
            
        mn = min(s)
        mx = max(s)
        
        # If the minimum is already at the start or maximum at the end
        if s[0] == mn or s[-1] == mx:
            return 1
            
        min_prefix = min(s[:-1])
        max_suffix = max(s[1:])
        
        last_strict_min = s[-1] < min_prefix
        first_strict_max = s[0] > max_suffix
        
        if last_strict_min and first_strict_max:
            return 3
            
        return 2
