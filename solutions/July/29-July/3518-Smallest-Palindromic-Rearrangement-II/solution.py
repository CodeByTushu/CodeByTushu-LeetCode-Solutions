"""
Problem: LeetCode 3518 - Smallest Palindromic Rearrangement II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

class Solution:
    def smallestPalindrome(self, s: str, k: int) -> str:
        CAP = 2_000_000

        def comb_capped(n: int, r: int) -> int:
            if r < 0 or r > n:
                return 0
            r = min(r, n - r)
            res = 1
            for i in range(1, r + 1):
                res = res * (n - r + i) // i
                if res > CAP:
                    return CAP + 1
            return res

        def count_arrangements(cnt: list[int]) -> int:
            total = 0
            m = 1
            for i in range(26):
                if cnt[i] == 0:
                    continue
                c = comb_capped(total + cnt[i], cnt[i])
                m *= c
                if m > CAP:
                    m = CAP + 1
                total += cnt[i]
            return m

        count = [0] * 26
        for ch in s:
            count[ord(ch) - ord('a')] += 1

        mid_char = ""
        has_mid = False
        half = [0] * 26
        half_len = 0
        for i in range(26):
            if count[i] % 2 == 1:
                mid_char = chr(ord('a') + i)
                has_mid = True
            half[i] = count[i] // 2
            half_len += half[i]

        kk = k
        if count_arrangements(half) < kk:
            return ""

        cur = list(half)
        res_half = []
        for _ in range(half_len):
            for c in range(26):
                if cur[c] == 0:
                    continue
                cur[c] -= 1
                cnt = count_arrangements(cur)
                if cnt >= kk:
                    res_half.append(chr(ord('a') + c))
                    break
                else:
                    kk -= cnt
                    cur[c] += 1

        half_str = "".join(res_half)
        return half_str + (mid_char if has_mid else "") + half_str[::-1]
