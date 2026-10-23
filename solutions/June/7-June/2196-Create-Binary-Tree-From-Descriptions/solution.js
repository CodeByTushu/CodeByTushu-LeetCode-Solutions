/**
 * Problem: LeetCode 2196 - Create Binary Tree From Descriptions
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    const map = new Map();
    const children = new Set();

    for (const [parent, child, isLeft] of descriptions) {
        if (!map.has(parent)) {
            map.set(parent, new TreeNode(parent));
        }
        if (!map.has(child)) {
            map.set(child, new TreeNode(child));
        }

        const parentNode = map.get(parent);
        const childNode = map.get(child);

        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        children.add(child);
    }

    for (const [parent] of descriptions) {
        if (!children.has(parent)) {
            return map.get(parent);
        }
    }

    return null;
};
