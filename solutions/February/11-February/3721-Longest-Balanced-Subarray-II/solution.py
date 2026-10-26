"""
Problem: LeetCode 3721 - Longest Balanced Subarray II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class SegmentTree:
    def __init__(self, n: int):
        self.n = n
        self.tree_min = [1000000] * (4 * n)
        self.tree_max = [1000000] * (4 * n)
        self.lazy = [0] * (4 * n)
        self._build(1, 0, n - 1)

    def _build(self, node: int, start: int, end: int) -> None:
        if start == end:
            return
        mid = (start + end) >> 1
        self._build(node << 1, start, mid)
        self._build((node << 1) | 1, mid + 1, end)

    def _push(self, node: int) -> None:
        if self.lazy[node] != 0:
            val = self.lazy[node]
            left, right = node << 1, (node << 1) | 1

            self.tree_min[left] += val
            self.tree_max[left] += val
            self.lazy[left] += val

            self.tree_min[right] += val
            self.tree_max[right] += val
            self.lazy[right] += val

            self.lazy[node] = 0

    def activate(self, node: int, start: int, end: int, idx: int) -> None:
        if start == end:
            self.tree_min[node] = 0
            self.tree_max[node] = 0
            return
        self._push(node)
        mid = (start + end) >> 1
        if idx <= mid:
            self.activate(node << 1, start, mid, idx)
        else:
            self.activate((node << 1) | 1, mid + 1, end, idx)
        self.tree_min[node] = min(self.tree_min[node << 1], self.tree_min[(node << 1) | 1])
        self.tree_max[node] = max(self.tree_max[node << 1], self.tree_max[(node << 1) | 1])

    def update(self, node: int, start: int, end: int, l: int, r: int, val: int) -> None:
        if l <= start and end <= r:
            self.tree_min[node] += val
            self.tree_max[node] += val
            self.lazy[node] += val
            return
        self._push(node)
        mid = (start + end) >> 1
        if l <= mid:
            self.update(node << 1, start, mid, l, r, val)
        if r > mid:
            self.update((node << 1) | 1, mid + 1, end, l, r, val)
        self.tree_min[node] = min(self.tree_min[node << 1], self.tree_min[(node << 1) | 1])
        self.tree_max[node] = max(self.tree_max[node << 1], self.tree_max[(node << 1) | 1])

    def find_first_zero(self, node: int, start: int, end: int, max_r: int) -> int:
        if start > max_r or self.tree_min[node] > 0 or self.tree_max[node] < 0:
            return -1
        if start == end:
            return start
        self._push(node)
        mid = (start + end) >> 1
        res = self.find_first_zero(node << 1, start, mid, max_r)
        if res != -1:
            return res
        return self.find_first_zero((node << 1) | 1, mid + 1, end, max_r)


class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        seg = SegmentTree(n)
        last_pos = [-1] * 100001
        max_len = 0

        for r, v in enumerate(nums):
            w = 1 if v % 2 == 0 else -1
            prev = last_pos[v]
            last_pos[v] = r

            seg.activate(1, 0, n - 1, r)
            seg.update(1, 0, n - 1, prev + 1, r, w)

            first_zero = seg.find_first_zero(1, 0, n - 1, r)
            if first_zero != -1:
                max_len = max(max_len, r - first_zero + 1)

        return max_len
