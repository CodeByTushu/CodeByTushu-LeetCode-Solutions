from typing import List

class Solution:
    def longestSubsequence(self, nums: List[int]) -> int:
        total_xor = 0
        has_non_zero = False

        for num in nums:
            total_xor ^= num
            if num != 0:
                has_non_zero = True

        n = len(nums)
        if total_xor != 0:
            return n

        return n - 1 if has_non_zero else 0
