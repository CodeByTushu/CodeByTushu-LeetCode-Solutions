from typing import List

class Solution:
    def validSequence(self, word1: str, word2: str) -> List[int]:
        n, m = len(word1), len(word2)
        ans = [0] * m
        last = [-1] * m

        # last[j] stores the latest index i in word1 matching word2[j]
        # such that the suffix word2[j...m-1] can be matched in word1[i...]
        i, j = n - 1, m - 1
        while i >= 0 and j >= 0:
            if word1[i] == word2[j]:
                last[j] = i
                j -= 1
            i -= 1

        can_skip = True
        j = 0
        for i in range(n):
            if j == m:
                break
            if word1[i] == word2[j]:
                ans[j] = i
                j += 1
            elif can_skip and (j == m - 1 or i < last[j + 1]):
                can_skip = False
                ans[j] = i
                j += 1

        return ans if j == m else []
