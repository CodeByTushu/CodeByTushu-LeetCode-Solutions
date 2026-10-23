"""
Problem: LeetCode 3093 - Longest Common Suffix Queries
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class TrieNode:
    __slots__ = ('children', 'best_idx')
    def __init__(self):
        self.children = {}
        self.best_idx = -1

class Solution:
    def stringIndices(self, wordsContainer: List[str], wordsQuery: List[str]) -> List[int]:
        def is_better(new_idx: int, old_idx: int) -> bool:
            if old_idx == -1:
                return True
            len_new = len(wordsContainer[new_idx])
            len_old = len(wordsContainer[old_idx])
            if len_new != len_old:
                return len_new < len_old
            return new_idx < old_idx

        root = TrieNode()

        for i, word in enumerate(wordsContainer):
            if is_better(i, root.best_idx):
                root.best_idx = i

            curr = root
            for ch in reversed(word):
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                curr = curr.children[ch]
                if is_better(i, curr.best_idx):
                    curr.best_idx = i

        ans = []
        for query in wordsQuery:
            curr = root
            best = root.best_idx

            for ch in reversed(query):
                if ch not in curr.children:
                    break
                curr = curr.children[ch]
                best = curr.best_idx

            ans.append(best)

        return ans
