"""
Problem: 2840. Check if Strings Can be Made Equal With Operations II
Difficulty: Medium
Language: Python 3

Approach:
Even-indexed positions and odd-indexed positions can be permuted arbitrarily within
their own parity groups via even-distance swaps.
Compare sorted slices or character frequencies of s1 and s2 for both parities.

Time Complexity: O(n)
Space Complexity: O(1) auxiliary space (26 characters)
"""

from collections import Counter

class Solution:
    def checkStrings(self, s1: str, s2: str) -> bool:
        return (
            Counter(s1[0::2]) == Counter(s2[0::2]) and
            Counter(s1[1::2]) == Counter(s2[1::2])
        )
