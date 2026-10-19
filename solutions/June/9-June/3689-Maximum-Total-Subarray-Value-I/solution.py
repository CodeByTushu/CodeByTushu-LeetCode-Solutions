from typing import List


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return (max_val - min_val) * k
