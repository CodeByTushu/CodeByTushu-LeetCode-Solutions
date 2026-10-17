from typing import List


class Solution:
    def stoneGameVIII(self, stones: List[int]) -> int:
        n = len(stones)
        prefix = [0] * n
        prefix[0] = stones[0]
        for i in range(1, n):
            prefix[i] = prefix[i - 1] + stones[i]

        # dp represents the best score difference achievable starting from index i
        dp = prefix[-1]
        for i in range(n - 2, 0, -1):
            dp = max(dp, prefix[i] - dp)

        return dp
