"""
Problem: LeetCode 3331 - Find Subtree Sizes After Changes
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def findSubtreeSizes(self, parent: List[int], s: str) -> List[int]:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        new_parent = list(parent)
        last = [-1] * 26
        order = []

        # Iterative DFS to prevent recursion depth exceeded on deep trees (n <= 10^5)
        stack = [0]
        child_idx = [0] * n
        saved = [-1] * n

        c0 = ord(s[0]) - ord('a')
        saved[0] = last[c0]
        last[c0] = 0
        order.append(0)

        while stack:
            u = stack[-1]
            if child_idx[u] < len(children[u]):
                v = children[u][child_idx[u]]
                child_idx[u] += 1

                c = ord(s[v]) - ord('a')
                saved[v] = last[c]
                if last[c] != -1:
                    new_parent[v] = last[c]

                last[c] = v
                order.append(v)
                stack.append(v)
            else:
                stack.pop()
                last[ord(s[u]) - ord('a')] = saved[u]

        # Reverse preorder traversal to calculate subtree sizes from leaves to root
        size = [1] * n
        for i in range(n - 1, 0, -1):
            x = order[i]
            size[new_parent[x]] += size[x]

        return size
