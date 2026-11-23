"""
Problem: LeetCode 1352 - Product of the Last K Numbers
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""
class ProductOfNumbers:
    def __init__(self):
        # prefix[0] = 1 represents neutral multiplier for empty sequence
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            # 0 encountered, previous elements will never form positive prefix products
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        # If k >= len(self.prefix), the window of last k elements includes a 0
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-1 - k]
