from collections import defaultdict

class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        indices = defaultdict(list)
        min_dist = float('inf')

        for i, val in enumerate(nums):
            indices[val].append(i)
            if len(indices[val]) >= 3:
                min_dist = min(min_dist, 2 * (indices[val][-1] - indices[val][-3]))

        return min_dist if min_dist != float('inf') else -1
