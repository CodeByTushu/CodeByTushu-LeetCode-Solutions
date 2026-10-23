"""
Problem: LeetCode 3161 - Block Placement Queries
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def getResults(self, queries: List[List[int]]) -> List[bool]:
        max_coord = max(q[1] for q in queries)
        M = max_coord + 1

        tree_max = [0] * (4 * M)
        tree_has = [False] * (4 * M)

        def update(node: int, l: int, r: int, idx: int, val: int, has: bool) -> None:
            if l == r:
                tree_max[node] = val
                tree_has[node] = has
                return
            mid = (l + r) // 2
            if idx <= mid:
                update(node * 2, l, mid, idx, val, has)
            else:
                update(node * 2 + 1, mid + 1, r, idx, val, has)
            tree_max[node] = max(tree_max[node * 2], tree_max[node * 2 + 1])
            tree_has[node] = tree_has[node * 2] or tree_has[node * 2 + 1]

        def query_max(node: int, l: int, r: int, ql: int, qr: int) -> int:
            if ql > r or qr < l:
                return 0
            if ql <= l and r <= qr:
                return tree_max[node]
            mid = (l + r) // 2
            return max(query_max(node * 2, l, mid, ql, qr), query_max(node * 2 + 1, mid + 1, r, ql, qr))

        def find_prev(node: int, l: int, r: int, ql: int, qr: int) -> int:
            if ql > r or qr < l or not tree_has[node]:
                return -1
            if l == r:
                return l
            mid = (l + r) // 2
            res = find_prev(node * 2 + 1, mid + 1, r, ql, qr)
            if res != -1:
                return res
            return find_prev(node * 2, l, mid, ql, qr)

        def find_next(node: int, l: int, r: int, ql: int, qr: int) -> int:
            if ql > r or qr < l or not tree_has[node]:
                return -1
            if l == r:
                return l
            mid = (l + r) // 2
            res = find_next(node * 2, l, mid, ql, qr)
            if res != -1:
                return res
            return find_next(node * 2 + 1, mid + 1, r, ql, qr)

        update(1, 0, M - 1, 0, 0, True)

        ans = []
        for q in queries:
            if q[0] == 1:
                x = q[1]
                prev = find_prev(1, 0, M - 1, 0, x - 1)
                nxt = find_next(1, 0, M - 1, x + 1, M - 1)
                update(1, 0, M - 1, x, x - prev, True)
                if nxt != -1:
                    update(1, 0, M - 1, nxt, nxt - x, True)
            else:
                x, sz = q[1], q[2]
                prev = find_prev(1, 0, M - 1, 0, x)
                max_gap = max(query_max(1, 0, M - 1, 0, x), x - prev)
                ans.append(max_gap >= sz)

        return ans
