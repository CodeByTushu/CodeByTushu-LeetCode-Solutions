"""
Problem: LeetCode 3700 - Number of ZigZag Arrays II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1_000_000_007
        m = r - l + 1

        if n == 1:
            return m

        class Matrix:
            def __init__(self, n: int, m: int):
                self.n = n
                self.m = m
                self.data = [0] * (n * m)

            def get(self, i: int, j: int) -> int:
                return self.data[i * self.m + j]

            def set(self, i: int, j: int, val: int) -> None:
                self.data[i * self.m + j] = val

            def mul(self, b: 'Matrix') -> 'Matrix':
                res = Matrix(self.n, b.m)
                for i in range(self.n):
                    for k in range(self.m):
                        cur = self.get(i, k)
                        if cur == 0:
                            continue
                        for j in range(b.m):
                            res.set(
                                i,
                                j,
                                (res.get(i, j) + cur * b.get(k, j)) % MOD
                            )
                return res

            def pow(self, exp: int, res: 'Matrix') -> 'Matrix':
                base = Matrix(self.n, self.m)
                base.data = list(self.data)

                while exp > 0:
                    if exp & 1:
                        res = res.mul(base)
                    base = base.mul(base)
                    exp >>= 1

                return res

        trans = Matrix(2 * m, 2 * m)

        for i in range(m):
            for j in range(i):
                trans.set(i, j + m, 1)

            for j in range(i + 1, m):
                trans.set(i + m, j, 1)

        dp = Matrix(1, 2 * m)

        for i in range(2 * m):
            dp.set(0, i, 1)

        dp = trans.pow(n - 1, dp)

        ans = 0
        for i in range(2 * m):
            ans = (ans + dp.get(0, i)) % MOD

        return ans
