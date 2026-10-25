"""
Problem: LeetCode 2976 - Minimum Cost to Convert String I
Difficulty: Medium
Language: Python
Author: CodeByTushu

Floyd-Warshall Algorithm for All-Pairs Shortest Paths
Time Complexity: O(|Σ|^3 + |E| + N) where |Σ| = 26, N = len(source)
Space Complexity: O(|Σ|^2) = O(1) auxiliary space
"""

from typing import List

class Solution:
    def minimumCost(self, source: str, target: str, original: List[str], changed: List[str], cost: List[int]) -> int:
        NUM_CHARS = 26
        INF = float('inf')

        # Distance matrix initialized to infinity
        dist = [[INF] * NUM_CHARS for _ in range(NUM_CHARS)]
        for i in range(NUM_CHARS):
            dist[i][i] = 0

        # Build initial transition costs
        for orig, chg, c in zip(original, changed, cost):
            u = ord(orig) - ord('a')
            v = ord(chg) - ord('a')
            dist[u][v] = min(dist[u][v], c)

        # Floyd-Warshall Algorithm across all 26 lowercase English letters
        for k in range(NUM_CHARS):
            for i in range(NUM_CHARS):
                for j in range(NUM_CHARS):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        total_cost = 0

        # Sum minimal costs for transforming source to target
        for s_char, t_char in zip(source, target):
            if s_char != t_char:
                u = ord(s_char) - ord('a')
                v = ord(t_char) - ord('a')
                if dist[u][v] == INF:
                    return -1
                total_cost += dist[u][v]

        return total_cost
