/**
 * Problem: LeetCode 1722 - Minimize Hamming Distance After Swap Operations
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <numeric>
#include <unordered_map>

using namespace std;

class Solution {
    struct DSU {
        vector<int> parent;
        vector<int> rank;

        DSU(int n) : parent(n), rank(n, 0) {
            iota(parent.begin(), parent.end(), 0);
        }

        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }

        void unite(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
            }
        }
    };

public:
    int minimumHammingDistance(vector<int>& source, vector<int>& target, vector<vector<int>>& allowedSwaps) {
        int n = source.size();
        DSU dsu(n);

        for (const auto& swapOp : allowedSwaps) {
            dsu.unite(swapOp[0], swapOp[1]);
        }

        // Count frequencies of elements in source for each connected component
        unordered_map<int, unordered_map<int, int>> componentCounts;
        for (int i = 0; i < n; ++i) {
            int root = dsu.find(i);
            componentCounts[root][source[i]]++;
        }

        int hammingDistance = 0;
        for (int i = 0; i < n; ++i) {
            int root = dsu.find(i);
            auto& counts = componentCounts[root];
            int val = target[i];
            auto it = counts.find(val);
            if (it != counts.end() && it->second > 0) {
                it->second--;
            } else {
                hammingDistance++;
            }
        }

        return hammingDistance;
    }
};
