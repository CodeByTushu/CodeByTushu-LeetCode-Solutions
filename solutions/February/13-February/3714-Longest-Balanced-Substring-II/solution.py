"""
Problem: LeetCode 3714 - Longest Balanced Substring II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        max_len = 1

        # Case 1: Exactly 1 distinct character
        cur_run = 1
        for i in range(1, n):
            if s[i] == s[i - 1]:
                cur_run += 1
            else:
                cur_run = 1
            if cur_run > max_len:
                max_len = cur_run

        # Case 2: Exactly 2 distinct characters
        pairs = [
            ('a', 'b', 'c'),
            ('b', 'c', 'a'),
            ('a', 'c', 'b')
        ]

        for c1, c2, avoid in pairs:
            start = 0
            while start < n:
                while start < n and s[start] == avoid:
                    start += 1
                if start >= n:
                    break
                end = start
                while end < n and s[end] != avoid:
                    end += 1

                pos_map = {0: start - 1}
                diff = 0
                for i in range(start, end):
                    if s[i] == c1:
                        diff += 1
                    elif s[i] == c2:
                        diff -= 1

                    if diff in pos_map:
                        length = i - pos_map[diff]
                        if length > max_len:
                            max_len = length
                    else:
                        pos_map[diff] = i
                start = end

        # Case 3: Exactly 3 distinct characters
        state_map = {(0, 0): -1}
        ca = cb = cc = 0
        for i in range(n):
            if s[i] == 'a':
                ca += 1
            elif s[i] == 'b':
                cb += 1
            elif s[i] == 'c':
                cc += 1

            state = (ca - cb, cb - cc)
            if state in state_map:
                length = i - state_map[state]
                if length > max_len:
                    max_len = length
            else:
                state_map[state] = i

        return max_len
