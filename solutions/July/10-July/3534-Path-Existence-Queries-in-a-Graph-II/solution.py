"""
Problem: LeetCode 3534 - Path Existence Queries in a Graph II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def pathExistenceQueries(self, n: int, nums: List[int], maxDiff: int, queries: List[List[int]]) -> List[int]:
        # Pair values with original indices and sort by value
        pairs = sorted([(nums[i], i) for i in range(n)], key=lambda x: x[0])

        LOG = 20
        jump = [[0] * LOG for _ in range(n)]

        # Two-pointer approach from right to left to find furthest reachable node
        r = n - 1
        for l in range(n - 1, -1, -1):
            while pairs[r][0] - pairs[l][0] > maxDiff:
                r -= 1

            u_idx = pairs[l][1]
            to_idx = pairs[r][1]
            jump[u_idx][0] = to_idx

            for k in range(1, LOG):
                jump[u_idx][k] = jump[jump[u_idx][k - 1]][k - 1]

        ans = []
        for u, v in queries:
            if nums[u] > nums[v]:
                u, v = v, u

            if u == v:
                ans.append(0)
                continue

            if nums[u] == nums[v]:
                ans.append(1)
                continue

            dist = 0
            for k in range(LOG - 1, -1, -1):
                if nums[jump[u][k]] < nums[v]:
                    dist += 1 << k
                    u = jump[u][k]

            if nums[jump[u][0]] < nums[v]:
                ans.append(-1)
            else:
                ans.append(dist + 1)

        return ans
