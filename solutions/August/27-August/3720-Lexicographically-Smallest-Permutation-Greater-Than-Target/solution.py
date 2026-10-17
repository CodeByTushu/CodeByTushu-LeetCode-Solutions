class Solution:
    def lexGreaterPermutation(self, s: str, target: str) -> str:
        n = len(s)
        cnt = [0] * 26
        for ch in s:
            cnt[ord(ch) - ord("a")] += 1

        break_index = -1
        break_cnt = None

        for i in range(n):
            tc = ord(target[i]) - ord("a")

            # check if a character greater than target[i] is available right now
            if any(cnt[c] > 0 for c in range(tc + 1, 26)):
                break_index = i
                break_cnt = list(cnt)

            # try to continue matching target as prefix
            if cnt[tc] > 0:
                cnt[tc] -= 1
            else:
                break

        if break_index == -1:
            return ""

        res = [target[:break_index]]
        tc = ord(target[break_index]) - ord("a")

        chosen = -1
        for c in range(tc + 1, 26):
            if break_cnt[c] > 0:
                chosen = c
                break

        break_cnt[chosen] -= 1
        res.append(chr(ord("a") + chosen))

        for c in range(26):
            if break_cnt[c] > 0:
                res.append(chr(ord("a") + c) * break_cnt[c])

        return "".join(res)
