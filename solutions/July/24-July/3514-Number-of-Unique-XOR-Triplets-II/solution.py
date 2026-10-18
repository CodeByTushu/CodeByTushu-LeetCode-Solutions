from typing import List

class Solution:
    def uniqueXorTriplets(self, nums: List[int]) -> int:
        dp = [set() for _ in range(4)]
        dp[0].add(0)

        for x in nums:
            next_dp = [set(s) for s in dp]
            # Use current element up to 3 times (i <= j <= k allows repeats)
            for _ in range(3):
                for k in range(2, -1, -1):
                    for v in list(next_dp[k]):
                        next_dp[k + 1].add(v ^ x)
            dp = next_dp

        return len(dp[3])
