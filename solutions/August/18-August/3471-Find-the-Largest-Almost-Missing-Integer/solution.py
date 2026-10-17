from typing import List

class Solution:
    def largestInteger(self, nums: List[int], k: int) -> int:
        n = len(nums)
        count = [0] * 51

        for start in range(n - k + 1):
            seen = set(nums[start:start + k])
            for v in seen:
                count[v] += 1

        ans = -1
        for v in range(51):
            if count[v] == 1:
                ans = v

        return ans
