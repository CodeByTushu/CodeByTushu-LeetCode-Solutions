"""
Problem: LeetCode 3130 - Find All Possible Stable Binary Arrays II
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        MOD = 1_000_000_007

        # dp0[i][j]: valid stable arrays with i zeros and j ones ending in 0
        # dp1[i][j]: valid stable arrays with i zeros and j ones ending in 1
        dp0 = [[0] * (one + 1) for _ in range(zero + 1)]
        dp1 = [[0] * (one + 1) for _ in range(zero + 1)]

        # Base cases
        for i in range(1, min(zero, limit) + 1):
            dp0[i][0] = 1
        for j in range(1, min(one, limit) + 1):
            dp1[0][j] = 1

        # DP state transitions
        for i in range(1, zero + 1):
            for j in range(1, one + 1):
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD
                if i > limit:
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD

                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD
                if j > limit:
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD

        return (dp0[zero][one] + dp1[zero][one]) % MOD
