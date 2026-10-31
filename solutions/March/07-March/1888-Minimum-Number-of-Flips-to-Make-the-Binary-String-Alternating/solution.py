"""
Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        diff1 = 0  # Mismatches with pattern starting with '0' ("010101...")
        diff2 = 0  # Mismatches with pattern starting with '1' ("101010...")
        min_flips = n

        # Slide a window of length n over virtual doubled string s + s
        for i in range(2 * n):
            curr = s[i % n]
            t1 = '0' if i % 2 == 0 else '1'
            t2 = '1' if i % 2 == 0 else '0'

            if curr != t1:
                diff1 += 1
            if curr != t2:
                diff2 += 1

            # Remove character going out of window
            if i >= n:
                out = s[(i - n) % n]
                out_t1 = '0' if (i - n) % 2 == 0 else '1'
                out_t2 = '1' if (i - n) % 2 == 0 else '0'

                if out != out_t1:
                    diff1 -= 1
                if out != out_t2:
                    diff2 -= 1

            # Window of length n reached
            if i >= n - 1:
                min_flips = min(min_flips, diff1, diff2)

        return min_flips
