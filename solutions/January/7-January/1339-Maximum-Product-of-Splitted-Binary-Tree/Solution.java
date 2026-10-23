/**
 * Problem: LeetCode 1339 - Maximum Product of Splitted Binary Tree
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
    private List<Long> allSums = new ArrayList<>();

    public int maxProduct(TreeNode root) {
        long totalSum = computeSubtreeSums(root);
        long maxProd = 0;

        for (long sum : allSums) {
            long currentProd = sum * (totalSum - sum);
            if (currentProd > maxProd) {
                maxProd = currentProd;
            }
        }

        return (int) (maxProd % 1_000_000_007L);
    }

    private long computeSubtreeSums(TreeNode node) {
        if (node == null) {
            return 0;
        }

        long currentSum = node.val + computeSubtreeSums(node.left) + computeSubtreeSums(node.right);
        allSums.add(currentSum);
        return currentSum;
    }
}
