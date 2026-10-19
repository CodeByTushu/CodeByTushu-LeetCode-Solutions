class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def solve(x: int) -> int:
            if x <= 0:
                return 0

            s = str(x)
            n = len(s)
            memo_cnt = {}
            memo_sum = {}

            def dfs(
                pos: int, prev1: int, prev2: int, waviness: int, tight: bool
            ) -> tuple[int, int]:
                if pos == n:
                    return 1, waviness

                state = (pos, prev1, prev2, waviness)
                if not tight and state in memo_cnt:
                    return memo_cnt[state], memo_sum[state]

                limit = int(s[pos]) if tight else 9
                total_cnt = 0
                total_sum = 0

                for digit in range(limit + 1):
                    next_tight = tight and (digit == limit)
                    next_waviness = waviness

                    if prev2 != 10 and prev1 != 10:
                        if (prev1 > prev2 and prev1 > digit) or (
                            prev1 < prev2 and prev1 < digit
                        ):
                            next_waviness += 1

                    next_prev2 = prev1
                    next_prev1 = digit

                    if prev1 == 10 and digit == 0:
                        next_prev1 = 10
                        next_prev2 = 10

                    cnt, sm = dfs(
                        pos + 1, next_prev1, next_prev2, next_waviness, next_tight
                    )
                    total_cnt += cnt
                    total_sum += sm

                if not tight:
                    memo_cnt[state] = total_cnt
                    memo_sum[state] = total_sum

                return total_cnt, total_sum

            return dfs(0, 10, 10, 0, True)[1]

        return solve(num2) - solve(num1 - 1)
