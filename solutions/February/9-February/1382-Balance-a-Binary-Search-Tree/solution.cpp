/**
 * Problem: LeetCode 1382 - Balance a Binary Search Tree
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* balanceBST(TreeNode* root) {
        vector<int> sortedVals;
        inorder(root, sortedVals);
        return buildBalancedBST(sortedVals, 0, sortedVals.size() - 1);
    }

private:
    void inorder(TreeNode* node, vector<int>& sortedVals) {
        if (!node) {
            return;
        }
        inorder(node->left, sortedVals);
        sortedVals.push_back(node->val);
        inorder(node->right, sortedVals);
    }

    TreeNode* buildBalancedBST(const vector<int>& sortedVals, int left, int right) {
        if (left > right) {
            return nullptr;
        }

        int mid = left + (right - left) / 2;
        TreeNode* node = new TreeNode(sortedVals[mid]);
        node->left = buildBalancedBST(sortedVals, left, mid - 1);
        node->right = buildBalancedBST(sortedVals, mid + 1, right);

        return node;
    }
};
