import math

class Solution:
    def subsequencePairCount(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        max_val = max(nums)
        
        # dp[g1][g2] stores the number of disjoint subsequence pairs
        # with running GCD of the first subsequence g1 (0 if empty)
        # and running GCD of the second subsequence g2 (0 if empty).
        dp = [[0] * (max_val + 1) for _ in range(max_val + 1)]
        dp[0][0] = 1
        
        for num in nums:
            next_dp = [row[:] for row in dp]
            
            for g1 in range(max_val + 1):
                for g2 in range(max_val + 1):
                    val = dp[g1][g2]
                    if val == 0:
                        continue
                    
                    # Option 1: Place num into the first subsequence
                    ng1 = num if g1 == 0 else math.gcd(g1, num)
                    next_dp[ng1][g2] = (next_dp[ng1][g2] + val) % MOD
                    
                    # Option 2: Place num into the second subsequence
                    ng2 = num if g2 == 0 else math.gcd(g2, num)
                    next_dp[g1][ng2] = (next_dp[g1][ng2] + val) % MOD
                    
            dp = next_dp
            
        ans = 0
        for g in range(1, max_val + 1):
            ans = (ans + dp[g][g]) % MOD
            
        return ans
