class Solution:
    def findMissingElements(self, nums: list[int]) -> list[int]:
        min_val = min(nums)
        max_val = max(nums)
        present = set(nums)

        result = []
        for i in range(min_val, max_val + 1):
            if i not in present:
                result.append(i)

        return result
