/**
 * Problem: LeetCode 3093 - Longest Common Suffix Queries
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>

using namespace std;

class Solution {
    struct TrieNode {
        TrieNode* children[26];
        int bestIdx;

        TrieNode() : bestIdx(-1) {
            for (int i = 0; i < 26; i++) {
                children[i] = nullptr;
            }
        }
    };

    bool isBetter(int newIdx, int oldIdx, const vector<string>& wordsContainer) {
        if (oldIdx == -1) return true;
        int lenNew = wordsContainer[newIdx].size();
        int lenOld = wordsContainer[oldIdx].size();
        if (lenNew != lenOld) {
            return lenNew < lenOld;
        }
        return newIdx < oldIdx;
    }

public:
    vector<int> stringIndices(vector<string>& wordsContainer, vector<string>& wordsQuery) {
        TrieNode* root = new TrieNode();

        for (int i = 0; i < static_cast<int>(wordsContainer.size()); i++) {
            const string& word = wordsContainer[i];
            if (isBetter(i, root->bestIdx, wordsContainer)) {
                root->bestIdx = i;
            }

            TrieNode* curr = root;
            for (int j = static_cast<int>(word.size()) - 1; j >= 0; j--) {
                int c = word[j] - 'a';
                if (!curr->children[c]) {
                    curr->children[c] = new TrieNode();
                }
                curr = curr->children[c];
                if (isBetter(i, curr->bestIdx, wordsContainer)) {
                    curr->bestIdx = i;
                }
            }
        }

        vector<int> ans(wordsQuery.size());
        for (int i = 0; i < static_cast<int>(wordsQuery.size()); i++) {
            const string& query = wordsQuery[i];
            TrieNode* curr = root;
            int best = root->bestIdx;

            for (int j = static_cast<int>(query.size()) - 1; j >= 0; j--) {
                int c = query[j] - 'a';
                if (!curr->children[c]) {
                    break;
                }
                curr = curr->children[c];
                best = curr->bestIdx;
            }

            ans[i] = best;
        }

        return ans;
    }
};
