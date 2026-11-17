"""
Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def minimumChanges(self, s: str, k: int) -> int:
        n = len(s)
        INF = 1_000_000

        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i, n):
                length = j - i + 1
                if length == 1:
                    cost[i][j] = INF
                    continue

                best = INF
                for d in range(1, length):
                    if length % d != 0:
                        continue
                    changes = 0
                    m = length // d
                    for r in range(d):
                        a, b = 0, m - 1
                        while a < b:
                            if s[i + r + a * d] != s[i + r + b * d]:
                                changes += 1
                            a += 1
                            b -= 1
                    if changes < best:
                        best = changes
                cost[i][j] = best

        dp = [[INF] * (n + 1) for _ in range(k + 1)]
        dp[0][0] = 0

        for j in range(1, k + 1):
            for p in range(2 * j, n + 1):
                for q in range(2 * (j - 1), p - 1):
                    if dp[j - 1][q] >= INF:
                        continue
                    if dp[j - 1][q] + cost[q][p - 1] < dp[j][p]:
                        dp[j][p] = dp[j - 1][q] + cost[q][p - 1]

        return dp[k][n]
