class Solution:
    def processStr(self, s: str, k: int) -> str:
        n = len(s)
        length = [0] * n
        cur = 0

        # Calculate final length after every operation
        for i, ch in enumerate(s):
            if 'a' <= ch <= 'z':
                cur += 1
            elif ch == '*':
                if cur > 0:
                    cur -= 1
            elif ch == '#':
                cur = min(cur * 2, 10**15 + 5)
            # '%' does not change length
            length[i] = cur

        if k >= cur:
            return '.'

        # Work backwards
        for i in range(n - 1, -1, -1):
            ch = s[i]
            before = 0 if i == 0 else length[i - 1]

            if 'a' <= ch <= 'z':
                if k == before:
                    return ch
            elif ch == '*':
                # Removed last character; existing indices stay unchanged.
                pass
            elif ch == '#':
                if before > 0 and k >= before:
                    k -= before
            elif ch == '%':
                if before > 0:
                    k = before - 1 - k

        return '.'
