class Solution:
    def minInsertions(self, s: str) -> int:
        open_count = 0  # unmatched '('
        ans = 0         # insertions
        i = 0
        n = len(s)

        while i < n:
            if s[i] == '(':
                open_count += 1
                i += 1
            else:
                # Need two consecutive ')'
                if i + 1 < n and s[i + 1] == ')':
                    i += 2
                else:
                    ans += 1  # insert missing ')'
                    i += 1

                if open_count > 0:
                    open_count -= 1
                else:
                    ans += 1  # insert missing '('

        return ans + open_count * 2
