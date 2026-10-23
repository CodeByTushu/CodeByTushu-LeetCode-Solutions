"""
Problem: LeetCode 1722 - Minimize Hamming Distance After Swap Operations
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List
from collections import defaultdict


class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i: int, j: int) -> None:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1


class Solution:
    def minimumHammingDistance(
        self, source: List[int], target: List[int], allowedSwaps: List[List[int]]
    ) -> int:
        n = len(source)
        dsu = DSU(n)

        for u, v in allowedSwaps:
            dsu.union(u, v)

        # Count frequencies of source elements grouped by component root
        component_counts = defaultdict(lambda: defaultdict(int))
        for i in range(n):
            root = dsu.find(i)
            component_counts[root][source[i]] += 1

        hamming_distance = 0
        for i in range(n):
            root = dsu.find(i)
            counts = component_counts[root]
            val = target[i]
            if counts[val] > 0:
                counts[val] -= 1
            else:
                hamming_distance += 1

        return hamming_distance
