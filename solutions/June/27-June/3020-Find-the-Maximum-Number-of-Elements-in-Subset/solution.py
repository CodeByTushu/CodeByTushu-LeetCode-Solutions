from collections import Counter
from typing import List

class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        freq = Counter(nums)

        ans = 1

        if 1 in freq:
            cnt = freq[1]
            ans = max(ans, cnt - 1 if cnt % 2 == 0 else cnt)

        for x in freq:
            if x == 1:
                continue

            cur = x
            length = 0

            while freq.get(cur, 0) >= 2:
                length += 2

                if cur > 10**9 // cur:
                    break

                cur *= cur

            if freq.get(cur, 0) == 1:
                length += 1
            else:
                length -= 1

            ans = max(ans, length)

        return ans
