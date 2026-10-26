/**
 * Problem: LeetCode 1022 - Sum of Root To Leaf Binary Numbers
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

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
    public int sumRootToLeaf(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int current) {
        if (node == null) {
            return 0;
        }

        current = (current << 1) | node.val;

        // Leaf node reached
        if (node.left == null && node.right == null) {
            return current;
        }

        return dfs(node.left, current) + dfs(node.right, current);
    }
}
