"""
Problem: LeetCode 2685 - Count the Number of Complete Components
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from collections import deque
from typing import List

class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = [False] * n
        complete = 0

        for i in range(n):
            if visited[i]:
                continue

            queue = deque([i])
            visited[i] = True
            component = []

            while queue:
                node = queue.popleft()
                component.append(node)

                for next_node in graph[node]:
                    if not visited[next_node]:
                        visited[next_node] = True
                        queue.append(next_node)

            size = len(component)
            if all(len(graph[node]) == size - 1 for node in component):
                complete += 1

        return complete
