"""
Problem: LeetCode 2977 - Minimum Cost to Convert String II
Difficulty: Hard
Language: Python
Author: CodeByTushu

Floyd-Warshall Algorithm + Dynamic Programming
Time Complexity: O(V^3 + N * |lengths| * L_max)
Space Complexity: O(V^2 + N)
"""

from typing import List

class Solution:
    def minimumCost(self, source: str, target: str, original: List[str], changed: List[str], cost: List[int]) -> int:
        n = len(source)
        str_to_id = {}
        id_counter = 0

        for orig, chg in zip(original, changed):
            if orig not in str_to_id:
                str_to_id[orig] = id_counter
                id_counter += 1
            if chg not in str_to_id:
                str_to_id[chg] = id_counter
                id_counter += 1

        V = id_counter
        INF = float('inf')
        dist = [[INF] * V for _ in range(V)]
        for i in range(V):
            dist[i][i] = 0

        for orig, chg, c in zip(original, changed, cost):
            u = str_to_id[orig]
            v = str_to_id[chg]
            if c < dist[u][v]:
                dist[u][v] = c

        # Floyd-Warshall with sparsity pruning
        for k in range(V):
            for i in range(V):
                if dist[i][k] == INF:
                    continue
                d_ik = dist[i][k]
                for j in range(V):
                    if d_ik + dist[k][j] < dist[i][j]:
                        dist[i][j] = d_ik + dist[k][j]

        distinct_lengths = sorted(list({len(s) for s in original}))

        dp = [INF] * (n + 1)
        dp[0] = 0

        for i in range(1, n + 1):
            if source[i - 1] == target[i - 1] and dp[i - 1] < INF:
                dp[i] = min(dp[i], dp[i - 1])

            for L in distinct_lengths:
                j = i - L
                if j < 0:
                    continue
                if dp[j] == INF:
                    continue

                sub_s = source[j:i]
                sub_t = target[j:i]

                if sub_s in str_to_id and sub_t in str_to_id:
                    u = str_to_id[sub_s]
                    v = str_to_id[sub_t]
                    if dist[u][v] < INF:
                        dp[i] = min(dp[i], dp[j] + dist[u][v])

        return -1 if dp[n] == INF else dp[n]
