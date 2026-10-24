/**
 * Problem: LeetCode 865 - Smallest Subtree with all the Deepest Nodes
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
var subtreeWithAllDeepest = function(root) {
    function dfs(node) {
        if (!node) {
            return { depth: 0, node: null };
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        if (left.depth === right.depth) {
            return { depth: left.depth + 1, node: node };
        } else if (left.depth > right.depth) {
            return { depth: left.depth + 1, node: left.node };
        } else {
            return { depth: right.depth + 1, node: right.node };
        }
    }

    return dfs(root).node;
};
