"""
Problem: LeetCode 3699 - Number of ZigZag Arrays I
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1_000_000_007
        m = r - l + 1

        up = [1] * m
        down = [1] * m

        for _ in range(2, n + 1):
            new_up = [0] * m
            new_down = [0] * m

            prefix = 0
            for i in range(m):
                new_up[i] = prefix
                prefix = (prefix + down[i]) % MOD

            suffix = 0
            for i in range(m - 1, -1, -1):
                new_down[i] = suffix
                suffix = (suffix + up[i]) % MOD

            up = new_up
            down = new_down

        ans = 0
        for i in range(m):
            ans = (ans + up[i] + down[i]) % MOD

        return ans
