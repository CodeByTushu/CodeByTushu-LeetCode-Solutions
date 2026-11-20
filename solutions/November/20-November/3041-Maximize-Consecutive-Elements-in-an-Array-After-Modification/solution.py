"""
Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def maxSelectedElements(self, nums: List[int]) -> int:
        nums.sort()
        dp: dict[int, int] = {}
        ans = 1

        for x in nums:
            # Update x + 1 before x so that current x does not overwrite dp[x]
            # used by dp[x + 1] in the same iteration
            dp[x + 1] = dp.get(x, 0) + 1
            dp[x] = dp.get(x - 1, 0) + 1
            ans = max(ans, dp[x], dp[x + 1])

        return ans
