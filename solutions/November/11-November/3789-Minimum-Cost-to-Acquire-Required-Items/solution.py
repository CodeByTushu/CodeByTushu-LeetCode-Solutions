"""
Problem: LeetCode 3789 - Minimum Cost to Acquire Required Items
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def minimumCost(self, cost1: int, cost2: int, costBoth: int, need1: int, need2: int) -> int:
        common = min(need1, need2)
        rem1 = need1 - common
        rem2 = need2 - common

        # Option 1: Buy only Type 1 and Type 2 items separately
        option1 = need1 * cost1 + need2 * cost2

        # Option 2: Buy max(need1, need2) Type 3 items to cover both needs
        option2 = max(need1, need2) * costBoth

        # Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        pair_cost = min(cost1 + cost2, costBoth)
        option3 = common * pair_cost + rem1 * min(cost1, costBoth) + rem2 * min(cost2, costBoth)

        return min(option1, option2, option3)
