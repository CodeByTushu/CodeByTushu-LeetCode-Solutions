"""
Problem: LeetCode 3838 - Weighted Word Mapping
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def mapWordWeights(self, words: List[str], weights: List[int]) -> str:
        ans = []
        for word in words:
            total_weight = sum(weights[ord(ch) - ord('a')] for ch in word)
            rem = total_weight % 26
            # Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            mapped_char = chr(ord('z') - rem)
            ans.append(mapped_char)
        return "".join(ans)
