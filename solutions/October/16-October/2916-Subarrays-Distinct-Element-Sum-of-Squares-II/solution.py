"""
Problem: LeetCode 2916 - Subarrays Distinct Element Sum of Squares II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        MOD = 1_000_000_007
        n = len(nums)

        tree_sum = [0] * (4 * n)
        tree_sq = [0] * (4 * n)
        lazy = [0] * (4 * n)

        def apply(node: int, length: int, v: int) -> None:
            tree_sq[node] = (tree_sq[node] + 2 * v * tree_sum[node] + v * v * length) % MOD
            tree_sum[node] = (tree_sum[node] + v * length) % MOD
            lazy[node] = (lazy[node] + v) % MOD

        def push(node: int, l: int, r: int) -> None:
            if lazy[node]:
                mid = (l + r) // 2
                apply(node * 2, mid - l + 1, lazy[node])
                apply(node * 2 + 1, r - mid, lazy[node])
                lazy[node] = 0

        def update(node: int, l: int, r: int, ql: int, qr: int, v: int) -> None:
            if qr < l or r < ql:
                return
            if ql <= l and r <= qr:
                apply(node, r - l + 1, v)
                return
            push(node, l, r)
            mid = (l + r) // 2
            update(node * 2, l, mid, ql, qr, v)
            update(node * 2 + 1, mid + 1, r, ql, qr, v)
            tree_sum[node] = (tree_sum[node * 2] + tree_sum[node * 2 + 1]) % MOD
            tree_sq[node] = (tree_sq[node * 2] + tree_sq[node * 2 + 1]) % MOD

        last = {}
        ans = 0

        for j, x in enumerate(nums):
            prev = last.get(x, -1)
            update(1, 0, n - 1, prev + 1, j, 1)
            last[x] = j
            ans = (ans + tree_sq[1]) % MOD

        return ans
