"""
Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List

class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, i: int) -> int:
        root = i
        while root != self.parent[root]:
            root = self.parent[root]
        curr = i
        while curr != root:
            nxt = self.parent[curr]
            self.parent[curr] = root
            curr = nxt
        return root

    def union(self, i: int, j: int) -> bool:
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
            self.components -= 1
            return True
        return False

class Solution:
    def maxStability(self, n: int, edges: List[List[int]], k: int) -> int:
        mandatory_dsu = DSU(n)
        mandatory_count = 0
        min_mandatory = float('inf')

        # Check mandatory edges for cycles
        for u, v, s, must in edges:
            if must == 1:
                if not mandatory_dsu.union(u, v):
                    return -1
                mandatory_count += 1
                min_mandatory = min(min_mandatory, s)

        # Check overall graph connectivity
        total_dsu = DSU(n)
        for u, v, s, must in edges:
            total_dsu.union(u, v)
        if total_dsu.components > 1:
            return -1

        low = 1
        high = min(200000, min_mandatory) if mandatory_count > 0 else 200000
        ans = -1

        def can_form_tree(target: int) -> bool:
            dsu = DSU(n)

            # 1. Mandatory edges must have strength >= target
            for u, v, s, must in edges:
                if must == 1:
                    if s < target:
                        return False
                    dsu.union(u, v)

            # 2. Cost 0 optional edges
            for u, v, s, must in edges:
                if must == 0 and s >= target:
                    dsu.union(u, v)

            # 3. Cost 1 optional edges (up to k)
            upgrades_used = 0
            for u, v, s, must in edges:
                if must == 0 and s < target <= 2 * s:
                    if dsu.find(u) != dsu.find(v):
                        if upgrades_used < k:
                            dsu.union(u, v)
                            upgrades_used += 1

            return dsu.components == 1

        while low <= high:
            mid = (low + high) // 2
            if can_form_tree(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans
