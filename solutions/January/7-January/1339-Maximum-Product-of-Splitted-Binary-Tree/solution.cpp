/**
 * Problem: LeetCode 1339 - Maximum Product of Splitted Binary Tree
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

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
private:
    vector<long long> allSums;

    long long computeSubtreeSums(TreeNode* node) {
        if (!node) {
            return 0;
        }

        long long currentSum = node->val + computeSubtreeSums(node->left) + computeSubtreeSums(node->right);
        allSums.push_back(currentSum);
        return currentSum;
    }

public:
    int maxProduct(TreeNode* root) {
        allSums.clear();
        long long totalSum = computeSubtreeSums(root);
        long long maxProd = 0;
        const int MOD = 1e9 + 7;

        for (long long sum : allSums) {
            long long currentProd = sum * (totalSum - sum);
            maxProd = max(maxProd, currentProd);
        }

        return maxProd % MOD;
    }
};
