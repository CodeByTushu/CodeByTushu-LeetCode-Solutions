"""
Problem: LeetCode 1301 - Number of Paths with Max Score
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def pathsWithMaxScore(self, board: List[str]) -> List[int]:
        MOD = 1_000_000_007
        n = len(board)

        score = [[-1] * n for _ in range(n)]
        ways = [[0] * n for _ in range(n)]

        score[n - 1][n - 1] = 0
        ways[n - 1][n - 1] = 1

        dirs = ((1, 0), (0, 1), (1, 1))

        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if board[i][j] == "X":
                    continue
                if i == n - 1 and j == n - 1:
                    continue

                best = -1
                count = 0

                for di, dj in dirs:
                    ni, nj = i + di, j + dj
                    if ni >= n or nj >= n:
                        continue
                    if score[ni][nj] == -1:
                        continue

                    if score[ni][nj] > best:
                        best = score[ni][nj]
                        count = ways[ni][nj]
                    elif score[ni][nj] == best:
                        count = (count + ways[ni][nj]) % MOD

                if best == -1:
                    continue

                ch = board[i][j]
                if ch != "E" and ch != "S":
                    best += ord(ch) - ord("0")

                score[i][j] = best
                ways[i][j] = count

        if ways[0][0] == 0:
            return [0, 0]

        return [score[0][0], ways[0][0]]
