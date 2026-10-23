"""
Problem: LeetCode 2196 - Create Binary Tree From Descriptions
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def createBinaryTree(self, descriptions: List[List[int]]) -> Optional[TreeNode]:
        node_map = {}
        children = set()

        for parent, child, is_left in descriptions:
            if parent not in node_map:
                node_map[parent] = TreeNode(parent)
            if child not in node_map:
                node_map[child] = TreeNode(child)

            if is_left == 1:
                node_map[parent].left = node_map[child]
            else:
                node_map[parent].right = node_map[child]

            children.add(child)

        for parent, _, _ in descriptions:
            if parent not in children:
                return node_map[parent]

        return None
