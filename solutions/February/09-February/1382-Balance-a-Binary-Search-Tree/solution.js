/**
 * Problem: LeetCode 1382 - Balance a Binary Search Tree
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function(root) {
    const sortedVals = [];

    const inorder = function(node) {
        if (!node) return;
        inorder(node.left);
        sortedVals.push(node.val);
        inorder(node.right);
    };

    inorder(root);

    const buildBalancedBST = function(left, right) {
        if (left > right) return null;

        const mid = left + Math.floor((right - left) / 2);
        const node = new TreeNode(sortedVals[mid]);
        node.left = buildBalancedBST(left, mid - 1);
        node.right = buildBalancedBST(mid + 1, right);

        return node;
    };

    return buildBalancedBST(0, sortedVals.length - 1);
};
