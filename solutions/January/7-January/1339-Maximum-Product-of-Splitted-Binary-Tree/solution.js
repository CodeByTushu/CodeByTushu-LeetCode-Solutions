/**
 * Problem: LeetCode 1339 - Maximum Product of Splitted Binary Tree
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
 * @return {number}
 */
var maxProduct = function(root) {
    const MOD = 1000000007n;
    const allSums = [];

    function computeSubtreeSums(node) {
        if (!node) {
            return 0n;
        }

        const currentSum = BigInt(node.val) + computeSubtreeSums(node.left) + computeSubtreeSums(node.right);
        allSums.push(currentSum);
        return currentSum;
    }

    const totalSum = computeSubtreeSums(root);
    let maxProd = 0n;

    for (const sum of allSums) {
        const currentProd = sum * (totalSum - sum);
        if (currentProd > maxProd) {
            maxProd = currentProd;
        }
    }

    return Number(maxProd % MOD);
};
