"""
Problem: LeetCode 1411 - Number of Ways to Paint N × 3 Grid
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

class Solution:
    def numOfWays(self, n: int) -> int:
        MOD = 1_000_000_007
        color2 = 6  # Patterns with 2 distinct colors (e.g., ABA)
        color3 = 6  # Patterns with 3 distinct colors (e.g., ABC)

        for _ in range(2, n + 1):
            next_color2 = (3 * color2 + 2 * color3) % MOD
            next_color3 = (2 * color2 + 2 * color3) % MOD
            color2, color3 = next_color2, next_color3

        return (color2 + color3) % MOD
