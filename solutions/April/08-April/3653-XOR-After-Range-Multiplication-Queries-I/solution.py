class Solution:
    def xorAfterQueries(self, nums: list[int], queries: list[list[int]]) -> int:
        MOD = 1_000_000_007

        for l, r, k, v in queries:
            for idx in range(l, r + 1, k):
                nums[idx] = (nums[idx] * v) % MOD

        xor_sum = 0
        for val in nums:
            xor_sum ^= val

        return xor_sum
