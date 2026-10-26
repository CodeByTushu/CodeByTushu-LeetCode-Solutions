/**
 * Problem: LeetCode 1382 - Balance a Binary Search Tree
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.List;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode balanceBST(TreeNode root) {
        List<Integer> sortedVals = new ArrayList<>();
        inorder(root, sortedVals);
        return buildBalancedBST(sortedVals, 0, sortedVals.size() - 1);
    }

    private void inorder(TreeNode node, List<Integer> sortedVals) {
        if (node == null) {
            return;
        }
        inorder(node.left, sortedVals);
        sortedVals.add(node.val);
        inorder(node.right, sortedVals);
    }

    private TreeNode buildBalancedBST(List<Integer> sortedVals, int left, int right) {
        if (left > right) {
            return null;
        }

        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(sortedVals.get(mid));
        node.left = buildBalancedBST(sortedVals, left, mid - 1);
        node.right = buildBalancedBST(sortedVals, mid + 1, right);

        return node;
    }
}
