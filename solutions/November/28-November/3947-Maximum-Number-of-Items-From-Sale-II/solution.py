"""
Problem: LeetCode 3947 - Maximum Number of Items From Sale II
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maximumSaleItems(self, items: list[list[int]], budget: int) -> int:
        n = len(items)
        cnt = [0] * (n + 1)
        for it in items:
            cnt[it[0]] += 1

        # m[d] = count of items whose factor is a multiple of d
        m = [0] * (n + 1)
        for d in range(1, n + 1):
            for x in range(d, n + 1, d):
                m[d] += cnt[x]

        min_price = float('inf')
        candidates = []
        for it in items:
            factor, price = it[0], it[1]
            min_price = min(min_price, price)
            f = m[factor] - 1
            candidates.append((price, f))

        candidates.sort(key=lambda x: x[0])

        rem = budget
        ans = 0

        for price, f in candidates:
            # Value-2 copy is strictly beneficial only when price < 2 * min_price
            if price >= 2 * min_price:
                break
            if f == 0:
                continue

            take = min(f, rem // price)
            rem -= take * price
            ans += 2 * take

            if take < f:
                break

        # Remaining budget spent on cheapest item (value 1 each)
        ans += rem // min_price
        return ans
