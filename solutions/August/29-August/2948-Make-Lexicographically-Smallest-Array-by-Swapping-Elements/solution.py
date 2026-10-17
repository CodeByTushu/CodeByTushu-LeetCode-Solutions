class Solution:
    def lexicographicallySmallestArray(self, nums: list[int], limit: int) -> list[int]:
        n = len(nums)
        # Sort indices based on their values in nums
        idx = sorted(range(n), key=lambda x: nums[x])
        result = [0] * n

        i = 0
        while i < n:
            j = i + 1
            # Extend group as long as adjacent sorted values differ by <= limit
            while j < n and nums[idx[j]] - nums[idx[j - 1]] <= limit:
                j += 1

            # Extract and sort original indices within the connected component
            group_indices = sorted(idx[i:j])

            # Assign sorted values to sorted positions
            for k in range(len(group_indices)):
                result[group_indices[k]] = nums[idx[i + k]]

            i = j

        return result
