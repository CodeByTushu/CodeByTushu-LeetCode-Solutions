"""
Problem: LeetCode 1520 - Maximum Number of Non-Overlapping Substrings
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def maxNumOfSubstrings(self, s: str) -> List[str]:
        n = len(s)
        first = [float('inf')] * 26
        last = [-1] * 26
        
        for i, ch in enumerate(s):
            c = ord(ch) - ord('a')
            first[c] = min(first[c], i)
            last[c] = max(last[c], i)
            
        result = []
        prev_end = -1
        
        for i in range(n):
            c = ord(s[i]) - ord('a')
            if first[c] != i:
                continue
                
            l = i
            r = last[c]
            valid = True
            
            j = l
            while j <= r:
                ch = ord(s[j]) - ord('a')
                if first[ch] < l:
                    valid = False
                    break
                r = max(r, last[ch])
                j += 1
                
            if not valid:
                continue
                
            if l > prev_end:
                result.append(s[l:r + 1])
                prev_end = r
            elif r < prev_end:
                result[-1] = s[l:r + 1]
                prev_end = r
                
        return result
