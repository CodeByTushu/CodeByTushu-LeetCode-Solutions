import math

class Solution:
    def gcdSum(self, nums: list[int]) -> int:
        n = len(nums)
        prefix_gcd = [0] * n
        mx = 0
        
        for i in range(n):
            if nums[i] > mx:
                mx = nums[i]
            prefix_gcd[i] = math.gcd(nums[i], mx)
            
        prefix_gcd.sort()
        
        ans = 0
        l, r = 0, n - 1
        while l < r:
            ans += math.gcd(prefix_gcd[l], prefix_gcd[r])
            l += 1
            r -= 1
            
        return ans
