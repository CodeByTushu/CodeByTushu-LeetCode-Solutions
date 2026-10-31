"""
Problem: LeetCode 1382 - Balance a Binary Search Tree
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
    def balanceBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        sorted_vals: List[int] = []

        def inorder(node: Optional[TreeNode]) -> None:
            if not node:
                return
            inorder(node.left)
            sorted_vals.append(node.val)
            inorder(node.right)

        inorder(root)

        def build_balanced_bst(left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            mid = left + (right - left) // 2
            node = TreeNode(sorted_vals[mid])
            node.left = build_balanced_bst(left, mid - 1)
            node.right = build_balanced_bst(mid + 1, right)
            return node

        return build_balanced_bst(0, len(sorted_vals) - 1)
