"""
Problem: LeetCode 1306 - Jump Game III
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List
from collections import deque

class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        n = len(arr)
        queue = deque([start])
        visited = [False] * n
        visited[start] = True

        while queue:
            curr = queue.popleft()

            # Target reached: current index has value 0
            if arr[curr] == 0:
                return True

            # Jump forward: curr + arr[curr]
            forward = curr + arr[curr]
            if forward < n and not visited[forward]:
                visited[forward] = True
                queue.append(forward)

            # Jump backward: curr - arr[curr]
            backward = curr - arr[curr]
            if backward >= 0 and not visited[backward]:
                visited[backward] = True
                queue.append(backward)

        return False
