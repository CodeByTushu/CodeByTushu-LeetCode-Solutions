"""
Problem: LeetCode 1622 - Fancy Sequence
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

MOD = 1_000_000_007


class Fancy:

    def __init__(self):
        self.values = []
        self.a = 1
        self.b = 0

    def append(self, val: int) -> None:
        # x = (val - b) * inv(a) % MOD
        inv_a = pow(self.a, MOD - 2, MOD)
        x = ((val - self.b) % MOD * inv_a) % MOD
        self.values.append(x)

    def addAll(self, inc: int) -> None:
        self.b = (self.b + inc) % MOD

    def multAll(self, m: int) -> None:
        self.a = (self.a * m) % MOD
        self.b = (self.b * m) % MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.values):
            return -1
        return (self.a * self.values[idx] + self.b) % MOD
