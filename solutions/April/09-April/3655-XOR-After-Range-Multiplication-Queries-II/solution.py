import math
from collections import defaultdict

class Solution:
    def xorAfterQueries(self, nums: list[int], queries: list[list[int]]) -> int:
        MOD = 1_000_000_007
        n = len(nums)
        B = max(1, int(math.isqrt(n)))
        
        small_k = defaultdict(list)
        
        for l, r, k, v in queries:
            if k >= B:
                for idx in range(l, r + 1, k):
                    nums[idx] = (nums[idx] * v) % MOD
            else:
                small_k[k].append((l, r, v))
                
        for k, q_list in small_k.items():
            diff = [1] * (n + k)
            for l, r, v in q_list:
                diff[l] = (diff[l] * v) % MOD
                steps = (r - l) // k
                nxt = l + (steps + 1) * k
                diff[nxt] = (diff[nxt] * pow(v, MOD - 2, MOD)) % MOD
                
            for i in range(n):
                if i >= k:
                    diff[i] = (diff[i] * diff[i - k]) % MOD
                nums[i] = (nums[i] * diff[i]) % MOD
                
        xor_sum = 0
        for val in nums:
            xor_sum ^= val

        return xor_sum
