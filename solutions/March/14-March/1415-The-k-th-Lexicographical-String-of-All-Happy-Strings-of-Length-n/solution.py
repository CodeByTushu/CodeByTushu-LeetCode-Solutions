"""
Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        # Total happy strings of length n is 3 * 2^(n - 1)
        total = 3 * (1 << (n - 1))
        if k > total:
            return ""

        # Convert to 0-indexed
        k -= 1
        res = []
        chars = ['a', 'b', 'c']

        # Determine the first character
        block_size = 1 << (n - 1)
        idx = k // block_size
        res.append(chars[idx])
        k %= block_size

        # Determine each subsequent character
        for step in range(n - 2, -1, -1):
            block_size = 1 << step
            idx = k // block_size
            prev = res[-1]
            available = [c for c in chars if c != prev]
            res.append(available[idx])
            k %= block_size

        return "".join(res)
