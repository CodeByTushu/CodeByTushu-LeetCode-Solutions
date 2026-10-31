class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        n = len(nums)
        prev1 = [-1] * (n + 1)
        prev2 = [-1] * (n + 1)
        min_dist = float('inf')

        for i, val in enumerate(nums):
            if prev2[val] != -1:
                min_dist = min(min_dist, 2 * (i - prev2[val]))
            prev2[val] = prev1[val]
            prev1[val] = i

        return min_dist if min_dist != float('inf') else -1
