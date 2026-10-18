from typing import List

class Solution:
    def sumAndMultiply(self, s: str, queries: List[List[int]]) -> List[int]:
        MOD = 1_000_000_007
        n = len(s)

        # Precompute powers of 10 modulo MOD
        pow10 = [1] * (n + 1)
        for i in range(1, n + 1):
            pow10[i] = (pow10[i - 1] * 10) % MOD

        # Prefix arrays for concatenated value, non-zero digit count, and digit sum
        pref_val = [0] * (n + 1)
        pref_sum = [0] * (n + 1)
        pref_cnt = [0] * (n + 1)

        for i, ch in enumerate(s):
            d = ord(ch) - 48  # Equivalent to int(ch)
            pref_sum[i + 1] = pref_sum[i] + d
            if d != 0:
                pref_cnt[i + 1] = pref_cnt[i] + 1
                pref_val[i + 1] = (pref_val[i] * 10 + d) % MOD
            else:
                pref_cnt[i + 1] = pref_cnt[i]
                pref_val[i + 1] = pref_val[i]

        ans = []
        for l, r in queries:
            cnt = pref_cnt[r + 1] - pref_cnt[l]
            digit_sum = pref_sum[r + 1] - pref_sum[l]
            # Extract concatenated non-zero value: pref_val[r+1] - pref_val[l] * 10^cnt
            val = (pref_val[r + 1] - pref_val[l] * pow10[cnt]) % MOD
            ans.append((val * (digit_sum % MOD)) % MOD)

        return ans
