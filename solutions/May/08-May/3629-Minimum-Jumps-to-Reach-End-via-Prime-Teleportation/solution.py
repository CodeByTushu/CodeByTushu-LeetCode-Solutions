"""
Problem: LeetCode 3629 - Minimum Jumps to Reach End via Prime Teleportation
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List
from collections import deque, defaultdict

class Solution:
    def minJumps(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return 0

        max_val = max(nums)

        # Smallest Prime Factor (SPF) sieve
        spf = list(range(max_val + 1))
        for i in range(2, int(max_val**0.5) + 1):
            if spf[i] == i:
                for j in range(i * i, max_val + 1, i):
                    if spf[j] == j:
                        spf[j] = i

        # Group indices by prime factors
        prime_to_indices = defaultdict(list)
        for i, val in enumerate(nums):
            x = val
            while x > 1:
                p = spf[x]
                prime_to_indices[p].append(i)
                while x % p == 0:
                    x //= p

        # BFS for shortest path
        dist = [-1] * n
        dist[0] = 0
        queue = deque([0])

        while queue:
            u = queue.popleft()
            d = dist[u]

            if u == n - 1:
                return d

            # 1. Adjacent steps: u - 1 and u + 1
            if u - 1 >= 0 and dist[u - 1] == -1:
                dist[u - 1] = d + 1
                if u - 1 == n - 1:
                    return d + 1
                queue.append(u - 1)

            if u + 1 < n and dist[u + 1] == -1:
                dist[u + 1] = d + 1
                if u + 1 == n - 1:
                    return d + 1
                queue.append(u + 1)

            # 2. Prime Teleportation
            val = nums[u]
            if val >= 2 and spf[val] == val and val in prime_to_indices:
                for v in prime_to_indices[val]:
                    if dist[v] == -1:
                        dist[v] = d + 1
                        if v == n - 1:
                            return d + 1
                        queue.append(v)
                del prime_to_indices[val]

        return dist[n - 1]
