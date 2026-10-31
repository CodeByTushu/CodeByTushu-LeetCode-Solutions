"""
Problem: LeetCode 2573 - Find the String with LCP
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
class Solution:
    def findTheString(self, lcp: list[list[int]]) -> str:
        n = len(lcp)
        word = [None] * n
        cur_char_code = ord('a')

        for i in range(n):
            if word[i] is None:
                if cur_char_code > ord('z'):
                    return ""
                ch = chr(cur_char_code)
                cur_char_code += 1
                for j in range(i, n):
                    if lcp[i][j] > 0:
                        word[j] = ch

        # Verify the constructed string produces the exact LCP matrix
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if word[i] == word[j]:
                    expected = 1 + (lcp[i + 1][j + 1] if i + 1 < n and j + 1 < n else 0)
                else:
                    expected = 0
                if lcp[i][j] != expected:
                    return ""

        return "".join(word)
