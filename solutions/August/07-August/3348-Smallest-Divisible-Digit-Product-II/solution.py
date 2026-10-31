"""
Problem: LeetCode 3348 - Smallest Divisible Digit Product II
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import Dict

class Solution:
    FACTOR_COUNTS = {
        0: {},
        1: {},
        2: {2: 1},
        3: {3: 1},
        4: {2: 2},
        5: {5: 1},
        6: {2: 1, 3: 1},
        7: {7: 1},
        8: {2: 3},
        9: {3: 2}
    }

    def smallestNumber(self, num: str, t: int) -> str:
        prime_count = {2: 0, 3: 0, 5: 0, 7: 0}
        for p in [2, 3, 5, 7]:
            while t % p == 0:
                prime_count[p] += 1
                t //= p
        if t != 1:
            return "-1"

        def get_factor_count(count: Dict[int, int]) -> Dict[int, int]:
            c2 = max(0, count.get(2, 0))
            c3 = max(0, count.get(3, 0))
            c5 = max(0, count.get(5, 0))
            c7 = max(0, count.get(7, 0))

            count8 = c2 // 3
            rem2 = c2 % 3
            count9 = c3 // 2
            count3 = c3 % 2
            count4 = rem2 // 2
            count2 = rem2 % 2
            count6 = 0

            if count2 == 1 and count3 == 1:
                count2 = 0
                count3 = 0
                count6 = 1
            if count3 == 1 and count4 == 1:
                count2 = 1
                count6 = 1
                count3 = 0
                count4 = 0

            return {
                2: count2,
                3: count3,
                4: count4,
                5: c5,
                6: count6,
                7: c7,
                8: count8,
                9: count9
            }

        def construct(factors: Dict[int, int]) -> str:
            res = []
            for d in range(2, 10):
                cnt = factors.get(d, 0)
                if cnt > 0:
                    res.append(str(d) * cnt)
            return "".join(res)

        def subtract(a: Dict[int, int], b: Dict[int, int]) -> Dict[int, int]:
            res = dict(a)
            for k, v in b.items():
                res[k] = max(0, res.get(k, 0) - v)
            return res

        factor_count = get_factor_count(prime_count)
        min_digits = sum(factor_count.values())
        if min_digits > len(num):
            return construct(factor_count)

        prime_count_prefix = {2: 0, 3: 0, 5: 0, 7: 0}
        for ch in num:
            d = int(ch)
            for p, cnt in self.FACTOR_COUNTS[d].items():
                prime_count_prefix[p] += cnt

        first_zero_index = num.find('0')
        if first_zero_index == -1:
            first_zero_index = len(num)
            if all(prime_count_prefix[p] >= prime_count[p] for p in [2, 3, 5, 7]):
                return num

        cur_prefix = dict(prime_count_prefix)
        n = len(num)
        for i in range(n - 1, -1, -1):
            d = int(num[i])
            cur_prefix = subtract(cur_prefix, self.FACTOR_COUNTS[d])
            space_after = n - 1 - i

            if i > first_zero_index:
                continue

            for bigger in range(d + 1, 10):
                rem_needed = subtract(subtract(prime_count, cur_prefix), self.FACTOR_COUNTS[bigger])
                factors_after = get_factor_count(rem_needed)
                sum_after = sum(factors_after.values())

                if sum_after <= space_after:
                    fill_ones = space_after - sum_after
                    return (
                        num[:i] +
                        str(bigger) +
                        ("1" * fill_ones) +
                        construct(factors_after)
                    )

        factors_after_ext = get_factor_count(prime_count)
        fill_ones = n + 1 - sum(factors_after_ext.values())
        return ("1" * fill_ones) + construct(factors_after_ext)
