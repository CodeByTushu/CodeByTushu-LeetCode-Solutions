"""
Problem: LeetCode 1345 - Jump Game IV
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from collections import defaultdict, deque
from typing import List

class Solution:
    def minJumps(self, arr: List[int]) -> int:
        n = len(arr)
        if n <= 1:
            return 0
        
        # Group indices by element value
        value_indices = defaultdict(list)
        for i, val in enumerate(arr):
            value_indices[val].append(i)
            
        queue = deque([0])
        visited = [False] * n
        visited[0] = True
        steps = 0
        
        # Level-order Breadth-First Search
        while queue:
            for _ in range(len(queue)):
                curr = queue.popleft()
                
                # Reached the last index
                if curr == n - 1:
                    return steps
                
                # Option 1: Jump backward
                if curr - 1 >= 0 and not visited[curr - 1]:
                    visited[curr - 1] = True
                    queue.append(curr - 1)
                    
                # Option 2: Jump forward
                if curr + 1 < n and not visited[curr + 1]:
                    visited[curr + 1] = True
                    queue.append(curr + 1)
                    
                # Option 3: Jump to same value indices
                if arr[curr] in value_indices:
                    for next_idx in value_indices[arr[curr]]:
                        if not visited[next_idx]:
                            visited[next_idx] = True
                            queue.append(next_idx)
                    # Erase from map to prevent redundant O(N^2) searches
                    del value_indices[arr[curr]]
                    
            steps += 1
            
        return steps
