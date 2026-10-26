"""
Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        # Primes <= 19: 2, 3, 5, 7, 11, 13, 17, 19
        prime_mask = 665772
        count = 0

        for num in range(left, right + 1):
            set_bits = num.bit_count()
            if (prime_mask >> set_bits) & 1:
                count += 1

        return count
