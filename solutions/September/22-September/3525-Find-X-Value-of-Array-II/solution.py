"""
Problem: LeetCode 3525 - Find X Value of Array II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Node:
    __slots__ = ('prod', 'remain')

    def __init__(self, k: int):
        self.prod = 1
        self.remain = [0] * k

class Solution:
    def resultArray(self, nums: List[int], k: int, queries: List[List[int]]) -> List[int]:
        n = len(nums)
        tree = [None] * (4 * n)

        def merge(left: Node, right: Node) -> Node:
            parent = Node(k)
            parent.prod = (left.prod * right.prod) % k
            for r in range(k):
                parent.remain[r] = left.remain[r]
            left_prod = left.prod
            for r in range(k):
                combined = (left_prod * r) % k
                parent.remain[combined] += right.remain[r]
            return parent

        def build(cur: int, left: int, right: int) -> None:
            tree[cur] = Node(k)
            if left == right:
                val = nums[left] % k
                tree[cur].prod = val
                tree[cur].remain[val] = 1
                return
            mid = (left + right) // 2
            build(2 * cur + 1, left, mid)
            build(2 * cur + 2, mid + 1, right)
            tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2])

        def update(cur: int, lo: int, hi: int, idx: int, val: int) -> None:
            if lo == hi:
                for r in range(k):
                    tree[cur].remain[r] = 0
                tree[cur].prod = val
                tree[cur].remain[val] = 1
                return
            mid = (lo + hi) // 2
            if idx <= mid:
                update(2 * cur + 1, lo, mid, idx, val)
            else:
                update(2 * cur + 2, mid + 1, hi, idx, val)
            tree[cur] = merge(tree[2 * cur + 1], tree[2 * cur + 2])

        def query(cur: int, lo: int, hi: int, ql: int, qr: int) -> Node:
            if ql <= lo and hi <= qr:
                return tree[cur]
            mid = (lo + hi) // 2
            if qr <= mid:
                return query(2 * cur + 1, lo, mid, ql, qr)
            if ql > mid:
                return query(2 * cur + 2, mid + 1, hi, ql, qr)
            left_node = query(2 * cur + 1, lo, mid, ql, qr)
            right_node = query(2 * cur + 2, mid + 1, hi, ql, qr)
            return merge(left_node, right_node)

        build(0, 0, n - 1)
        ans = [0] * len(queries)
        for i, (index, value, start, x) in enumerate(queries):
            update(0, 0, n - 1, index, value % k)
            res_node = query(0, 0, n - 1, start, n - 1)
            ans[i] = res_node.remain[x]

        return ans
