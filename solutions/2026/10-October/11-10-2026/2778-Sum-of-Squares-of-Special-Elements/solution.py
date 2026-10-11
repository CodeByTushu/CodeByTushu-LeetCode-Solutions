class Solution:
    def sumOfSquares(self, nums: list[int]) -> int:
        n = len(nums)
        total_sum = 0

        for i in range(1, n + 1):
            if n % i == 0:
                total_sum += nums[i - 1] * nums[i - 1]

        return total_sum
