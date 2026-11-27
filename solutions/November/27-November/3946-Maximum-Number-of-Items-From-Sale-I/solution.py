"""
Problem: LeetCode 3946 - Maximum Number of Items From Sale I
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maximumSaleItems(self, items: list[list[int]], budget: int) -> int:
        n = len(items)
        f = [0] * n
        min_price = float('inf')

        for i in range(n):
            min_price = min(min_price, items[i][1])
            for j in range(n):
                if i != j and items[j][0] % items[i][0] == 0:
                    f[i] += 1

        dp = [0] * (budget + 1)

        # Step 1: 0/1 Knapsack for first copy of each item (value = 1 + f[i])
        for i in range(n):
            price = items[i][1]
            value = 1 + f[i]
            for b in range(budget, price - 1, -1):
                dp[b] = max(dp[b], dp[b - price] + value)

        # Step 2: Unbounded Knapsack for extra copies using cheapest item
        for b in range(min_price, budget + 1):
            dp[b] = max(dp[b], dp[b - min_price] + 1)

        return dp[budget]
