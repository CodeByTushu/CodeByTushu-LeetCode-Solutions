from collections import deque
from typing import List


class Solution:
    def countNonDecreasingSubarrays(self, nums: List[int], k: int) -> int:
        n = len(nums)
        pre = [0] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] + nums[i]

        dq = deque()  # stores indices of prefix max steps (front = left side)
        total = 0     # sum of prefixMax in window [l..r]
        r = n - 1
        ans = 0

        for l in range(n - 1, -1, -1):
            # Add nums[l] to the left, pop smaller/equal records
            while dq and nums[dq[0]] <= nums[l]:
                f = dq.popleft()
                end = dq[0] if dq else r + 1
                total -= nums[f] * (end - f)

            end = dq[0] if dq else r + 1
            total += nums[l] * (end - l)
            dq.appendleft(l)

            # cost = sum(prefixMax) - sum(nums) in window [l..r]
            cost = total - (pre[r + 1] - pre[l])

            # If cost > k, shrink window from right side
            while cost > k:
                last = dq[-1]
                total -= nums[last]
                if last == r:
                    dq.pop()
                r -= 1
                cost = total - (pre[r + 1] - pre[l])

            ans += r - l + 1

        return ans
