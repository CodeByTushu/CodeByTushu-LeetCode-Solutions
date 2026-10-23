"""
Problem: LeetCode 1339 - Maximum Product of Splitted Binary Tree
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import Optional, List

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxProduct(self, root: Optional[TreeNode]) -> int:
        MOD = 1_000_000_007
        all_sums: List[int] = []

        def compute_subtree_sums(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            curr_sum = node.val + compute_subtree_sums(node.left) + compute_subtree_sums(node.right)
            all_sums.append(curr_sum)
            return curr_sum

        total_sum = compute_subtree_sums(root)
        max_prod = 0

        for s in all_sums:
            prod = s * (total_sum - s)
            if prod > max_prod:
                max_prod = prod

        return max_prod % MOD
