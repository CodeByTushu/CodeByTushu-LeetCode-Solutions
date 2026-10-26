/**
 * Problem: LeetCode 110 - Balanced Binary Tree
 * Difficulty: Easy
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
 * @return {boolean}
 */
var isBalanced = function(root) {
    const checkHeight = function(node) {
        if (node === null) {
            return 0;
        }

        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) {
            return -1;
        }

        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) {
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    };

    return checkHeight(root) !== -1;
};
