import bisect
from typing import List


class Solution:
    def maxActiveSectionsAfterTrade(
        self, s: str, queries: List[List[int]]
    ) -> List[int]:
        n = len(s)

        # 1. Run-length encode s
        runs = []
        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            runs.append((i, j - 1, int(s[i])))
            i = j

        total_ones = s.count("1")
        m = len(runs)

        # 2. Collect candidate interior 1-runs
        cand_start = []
        cand_end = []
        full_zl = []
        full_zr = []
        full_g = []

        for idx in range(1, m - 1):
            run = runs[idx]
            if run[2] == 1:
                prev_run = runs[idx - 1]
                next_run = runs[idx + 1]
                zl = run[0] - prev_run[0]
                zr = next_run[1] - run[1]
                cand_start.append(run[0])
                cand_end.append(run[1])
                full_zl.append(zl)
                full_zr.append(zr)
                full_g.append(zl + zr)

        cnt = len(cand_start)

        # 3. Sparse table over full_g for O(1) range-max queries
        log2 = [0] * (cnt + 1)
        for k in range(2, cnt + 1):
            log2[k] = log2[k // 2] + 1

        sparse = []
        if cnt > 0:
            LOG = log2[cnt]
            sparse.append(list(full_g))
            for k in range(1, LOG + 1):
                half = 1 << (k - 1)
                row = []
                for idx in range(cnt - (1 << k) + 1):
                    row.append(max(sparse[k - 1][idx], sparse[k - 1][idx + half]))
                sparse.append(row)

        # 4. Answer queries
        ans = []
        for l, r in queries:
            result = total_ones

            if cnt > 0:
                i_lo = bisect.bisect_right(cand_start, l)
                i_hi = bisect.bisect_left(cand_end, r) - 1

                if i_lo <= i_hi and i_lo < cnt and i_hi >= 0:
                    gain = 0

                    if i_hi - i_lo >= 2:
                        lo = i_lo + 1
                        hi = i_hi - 1
                        length = hi - lo + 1
                        kk = log2[length]
                        gain = max(
                            gain,
                            max(
                                sparse[kk][lo],
                                sparse[kk][hi - (1 << kk) + 1],
                            ),
                        )

                    clip_lo = min(cand_start[i_lo] - l, full_zl[i_lo]) + min(
                        r - cand_end[i_lo], full_zr[i_lo]
                    )
                    clip_hi = min(cand_start[i_hi] - l, full_zl[i_hi]) + min(
                        r - cand_end[i_hi], full_zr[i_hi]
                    )

                    gain = max(gain, clip_lo, clip_hi)
                    result += gain

            ans.append(result)

        return ans
