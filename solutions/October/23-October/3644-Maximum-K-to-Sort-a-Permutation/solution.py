from typing import List

class Solution:
    def sortPermutation(self, nums: List[int]) -> int:
        ans = -1
        for i, val in enumerate(nums):
            if val != i:
                ans &= val
        return 0 if ans == -1 else ans
