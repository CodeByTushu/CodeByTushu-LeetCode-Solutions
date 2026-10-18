import math
from typing import List

class Solution:
    def findGCD(self, nums: List[int]) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return math.gcd(min_val, max_val)
