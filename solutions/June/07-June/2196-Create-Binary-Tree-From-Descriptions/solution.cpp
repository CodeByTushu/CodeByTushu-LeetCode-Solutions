#include <vector>
#include <unordered_map>
#include <unordered_set>

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
/**
 * Problem: LeetCode 2196 - Create Binary Tree From Descriptions
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    TreeNode* createBinaryTree(vector<vector<int>>& descriptions) {
        unordered_map<int, TreeNode*> nodeMap;
        unordered_set<int> children;

        for (const auto& d : descriptions) {
            int parent = d[0];
            int child = d[1];
            int isLeft = d[2];

            if (nodeMap.find(parent) == nodeMap.end()) {
                nodeMap[parent] = new TreeNode(parent);
            }
            if (nodeMap.find(child) == nodeMap.end()) {
                nodeMap[child] = new TreeNode(child);
            }

            if (isLeft == 1) {
                nodeMap[parent]->left = nodeMap[child];
            } else {
                nodeMap[parent]->right = nodeMap[child];
            }

            children.insert(child);
        }

        for (const auto& d : descriptions) {
            int parent = d[0];
            if (children.find(parent) == children.end()) {
                return nodeMap[parent];
            }
        }

        return nullptr;
    }
};
