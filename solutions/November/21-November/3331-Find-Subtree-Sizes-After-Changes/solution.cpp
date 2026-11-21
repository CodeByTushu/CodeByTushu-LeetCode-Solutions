/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> findSubtreeSizes(vector<int>& parent, string s) {
        int n = parent.size();

        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) {
            children[parent[i]].push_back(i);
        }

        vector<int> newPar = parent;
        vector<int> last(26, -1);
        vector<int> saved(n, -1);
        vector<int> order;
        order.reserve(n);

        vector<int> it(n, 0);
        vector<int> stack;
        stack.reserve(n);

        int c0 = s[0] - 'a';
        saved[0] = last[c0];
        last[c0] = 0;
        order.push_back(0);
        stack.push_back(0);

        // Iterative DFS
        while (!stack.empty()) {
            int x = stack.back();
            if (it[x] < (int)children[x].size()) {
                int child = children[x][it[x]++];
                int c = s[child] - 'a';
                saved[child] = last[c];
                if (last[c] != -1) newPar[child] = last[c];

                last[c] = child;
                order.push_back(child);
                stack.push_back(child);
            } else {
                stack.pop();
                last[s[x] - 'a'] = saved[x];
            }
        }

        // Subtree sizes using reverse preorder traversal
        vector<int> size(n, 1);
        for (int i = n - 1; i >= 1; i--) {
            int x = order[i];
            size[newPar[x]] += size[x];
        }

        return size;
    }
};
