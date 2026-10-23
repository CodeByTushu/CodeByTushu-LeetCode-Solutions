"""
Problem: LeetCode 2472 - Maximum Number of Non-overlapping Palindrome Substrings
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        is_palin = [[False] * n for _ in range(n)]
        
        for i in range(n):
            is_palin[i][i] = True
            
        for i in range(n - 1):
            is_palin[i][i + 1] = (s[i] == s[i + 1])
            
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                is_palin[i][j] = (s[i] == s[j]) and is_palin[i + 1][j - 1]
                
        count = 0
        i = 0
        while i <= n - k:
            found = False
            for length in range(k, k + 2):
                j = i + length - 1
                if j < n and is_palin[i][j]:
                    count += 1
                    i = j + 1
                    found = True
                    break
            if not found:
                i += 1
                
        return count
