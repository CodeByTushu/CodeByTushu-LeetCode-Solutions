"""
Problem: LeetCode 2452 - Words Within Two Edits of Dictionary
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:
    def twoEditWords(
        self, queries: List[str], dictionary: List[str]
    ) -> List[str]:
        result = []

        for query in queries:
            for word in dictionary:
                diff = 0
                for c1, c2 in zip(query, word):
                    if c1 != c2:
                        diff += 1
                        if diff > 2:
                            break
                if diff <= 2:
                    result.append(query)
                    break

        return result
