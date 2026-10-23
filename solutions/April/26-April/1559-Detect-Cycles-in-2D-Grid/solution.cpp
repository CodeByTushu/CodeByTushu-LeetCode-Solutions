/**
 * Problem: LeetCode 1559 - Detect Cycles in 2D Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <numeric>

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

        bool unite(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI == rootJ) return false; // Cycle detected

            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
    };

public:
    bool containsCycle(vector<vector<char>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        DSU dsu(m * n);

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                int u = r * n + c;

                // Check right neighbor
                if (c + 1 < n && grid[r][c] == grid[r][c + 1]) {
                    int v = r * n + (c + 1);
                    if (!dsu.unite(u, v)) {
                        return true;
                    }
                }

                // Check down neighbor
                if (r + 1 < m && grid[r][c] == grid[r + 1][c]) {
                    int v = (r + 1) * n + c;
                    if (!dsu.unite(u, v)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
};
