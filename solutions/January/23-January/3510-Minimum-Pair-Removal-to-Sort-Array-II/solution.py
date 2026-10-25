"""
Problem: LeetCode 3510 - Minimum Pair Removal to Sort Array II
Difficulty: Hard
Language: Python
Author: CodeByTushu

Optimized Doubly Linked List + PriorityQueue (Min-Heap) Approach
Time Complexity: O(n log n)
Space Complexity: O(n)
"""

import heapq
from typing import List

class Solution:
    def minimumPairRemoval(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return 0

        val = [int(x) for x in nums]
        prev = [i - 1 for i in range(n)]
        nxt = [i + 1 if i + 1 < n else -1 for i in range(n)]
        deleted = [False] * n
        version = [0] * n

        descents = 0
        for i in range(n - 1):
            if val[i] > val[i + 1]:
                descents += 1

        if descents == 0:
            return 0

        # Heap elements: (sum, node_id, version)
        pq = [(val[i] + val[i + 1], i, 0) for i in range(n - 1)]
        heapq.heapify(pq)

        ops = 0
        while descents > 0 and pq:
            pair_sum, u, ver = heapq.heappop(pq)

            if deleted[u] or ver != version[u]:
                continue
            v = nxt[u]
            if v == -1 or deleted[v]:
                continue
            if pair_sum != val[u] + val[v]:
                continue

            p = prev[u]
            w = nxt[v]

            # Remove previous inversion contributions
            if p != -1 and val[p] > val[u]:
                descents -= 1
            if val[u] > val[v]:
                descents -= 1
            if w != -1 and val[v] > val[w]:
                descents -= 1

            # Merge u and v
            val[u] += val[v]
            deleted[v] = True
            nxt[u] = w
            if w != -1:
                prev[w] = u

            # Add new inversion contributions
            if p != -1 and val[p] > val[u]:
                descents += 1
            if w != -1 and val[u] > val[w]:
                descents += 1

            version[u] += 1
            ops += 1

            if descents == 0:
                break

            # Push updated adjacent pairs
            if p != -1:
                version[p] += 1
                heapq.heappush(pq, (val[p] + val[u], p, version[p]))
            if w != -1:
                heapq.heappush(pq, (val[u] + val[w], u, version[u]))

        return ops
