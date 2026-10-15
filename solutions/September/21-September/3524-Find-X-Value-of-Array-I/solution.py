from typing import List

class Solution:
    def resultArray(self, nums: List[int], k: int) -> List[int]:
        result = [0] * k
        dp = [0] * k
        for num in nums:
            new_dp = [0] * k
            val_mod = num % k
            for rem in range(k):
                if dp[rem] > 0:
                    new_rem = (rem * val_mod) % k
                    new_dp[new_rem] += dp[rem]
            new_dp[val_mod] += 1
            for x in range(k):
                result[x] += new_dp[x]
            dp = new_dp
        return result
