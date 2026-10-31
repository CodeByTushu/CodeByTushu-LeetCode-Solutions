class Solution:
    def getMinDistance(self, nums: list[int], target: int, start: int) -> int:
        min_dist = float('inf')
        for i, val in enumerate(nums):
            if val == target:
                min_dist = min(min_dist, abs(i - start))
                if min_dist == 0:
                    return 0
        return min_dist
