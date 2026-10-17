from collections import deque

class Solution:
    def remainingMethods(self, n: int, k: int, invocations: list[list[int]]) -> list[int]:
        graph = [[] for _ in range(n)]
        for u, v in invocations:
            graph[u].append(v)

        suspicious = [False] * n
        queue = deque([k])
        suspicious[k] = True

        while queue:
            curr = queue.popleft()
            for nxt in graph[curr]:
                if not suspicious[nxt]:
                    suspicious[nxt] = True
                    queue.append(nxt)

        for u, v in invocations:
            if not suspicious[u] and suspicious[v]:
                return list(range(n))

        return [i for i in range(n) if not suspicious[i]]
