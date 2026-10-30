"""
Problem: 3474. Lexicographically Smallest Generated String
Difficulty: Hard
Language: Python 3

Approach:
1. Enforce 'T' constraints by fixing corresponding characters of str2.
2. Fill unassigned positions with 'a' for lexicographical minimality.
3. For each 'F' index where the window equals str2, change the rightmost
   modifiable position in that window to 'b'.
4. Perform final verification to ensure all constraints are satisfied.

Time Complexity: O(n * m)
Space Complexity: O(n + m) auxiliary space
"""

class Solution:
    def generateString(self, str1: str, str2: str) -> str:
        n = len(str1)
        m = len(str2)
        sz = n + m - 1

        ans = [None] * sz
        modifiable = [True] * sz

        # 1. Enforce 'T' constraints
        for i in range(n):
            if str1[i] == 'T':
                for j in range(m):
                    pos = i + j
                    ch = str2[j]
                    if ans[pos] is not None and ans[pos] != ch:
                        return ""
                    ans[pos] = ch
                    modifiable[pos] = False

        # 2. Fill unassigned with 'a'
        for i in range(sz):
            if ans[i] is None:
                ans[i] = 'a'

        # 3. Resolve 'F' constraints
        for i in range(n):
            if str1[i] == 'F':
                match = True
                for j in range(m):
                    if ans[i + j] != str2[j]:
                        match = False
                        break

                if match:
                    modifiable_pos = -1
                    for j in range(m - 1, -1, -1):
                        if modifiable[i + j]:
                            modifiable_pos = i + j
                            break

                    if modifiable_pos == -1:
                        return ""

                    ans[modifiable_pos] = 'b'
                    modifiable[modifiable_pos] = False

        # 4. Final verification
        for i in range(n):
            match = True
            for j in range(m):
                if ans[i + j] != str2[j]:
                    match = False
                    break
            if str1[i] == 'T' and not match:
                return ""
            if str1[i] == 'F' and match:
                return ""

        return "".join(ans)
