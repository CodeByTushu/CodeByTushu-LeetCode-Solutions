"""
Problem: LeetCode 2213 - Longest Substring of One Repeating Character
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def longestRepeating(self, s: str, queryCharacters: str, queryIndices: List[int]) -> List[int]:
        n = len(s)
        left_ch = [''] * (4 * n)
        right_ch = [''] * (4 * n)
        pre = [0] * (4 * n)
        suf = [0] * (4 * n)
        best = [0] * (4 * n)

        def pull(node: int, l: int, mid: int, r: int) -> None:
            left_node = 2 * node
            right_node = 2 * node + 1
            left_len = mid - l + 1
            right_len = r - mid

            left_ch[node] = left_ch[left_node]
            right_ch[node] = right_ch[right_node]

            pre[node] = pre[left_node]
            if pre[left_node] == left_len and right_ch[left_node] == left_ch[right_node]:
                pre[node] += pre[right_node]

            suf[node] = suf[right_node]
            if suf[right_node] == right_len and right_ch[left_node] == left_ch[right_node]:
                suf[node] += suf[left_node]

            best[node] = max(best[left_node], best[right_node])
            if right_ch[left_node] == left_ch[right_node]:
                best[node] = max(best[node], suf[left_node] + pre[right_node])

        def build(node: int, l: int, r: int) -> None:
            if l == r:
                left_ch[node] = right_ch[node] = s[l]
                pre[node] = suf[node] = best[node] = 1
                return
            mid = (l + r) // 2
            build(2 * node, l, mid)
            build(2 * node + 1, mid + 1, r)
            pull(node, l, mid, r)

        def update(node: int, l: int, r: int, idx: int, c: str) -> None:
            if l == r:
                left_ch[node] = right_ch[node] = c
                pre[node] = suf[node] = best[node] = 1
                return
            mid = (l + r) // 2
            if idx <= mid:
                update(2 * node, l, mid, idx, c)
            else:
                update(2 * node + 1, mid + 1, r, idx, c)
            pull(node, l, mid, r)

        build(1, 0, n - 1)

        k = len(queryCharacters)
        ans = [0] * k
        for i in range(k):
            update(1, 0, n - 1, queryIndices[i], queryCharacters[i])
            ans[i] = best[1]

        return ans
