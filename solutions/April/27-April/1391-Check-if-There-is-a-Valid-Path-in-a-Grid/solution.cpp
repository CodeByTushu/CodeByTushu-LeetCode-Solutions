/**
 * Problem: LeetCode 1391 - Check if There is a Valid Path in a Grid
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

        DSU(int n) : parent(n) {
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
                parent[rootI] = rootJ;
            }
        }
    };

public:
    bool hasValidPath(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        DSU dsu(m * n);

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                int val = grid[r][c];

                // Check right neighbor
                if (c + 1 < n) {
                    int rightVal = grid[r][c + 1];
                    bool canGoRight = (val == 1 || val == 4 || val == 6);
                    bool canReceiveLeft = (rightVal == 1 || rightVal == 3 || rightVal == 5);
                    if (canGoRight && canReceiveLeft) {
                        dsu.unite(r * n + c, r * n + (c + 1));
                    }
                }

                // Check down neighbor
                if (r + 1 < m) {
                    int downVal = grid[r + 1][c];
                    bool canGoDown = (val == 2 || val == 3 || val == 4);
                    bool canReceiveUp = (downVal == 2 || downVal == 5 || downVal == 6);
                    if (canGoDown && canReceiveUp) {
                        dsu.unite(r * n + c, (r + 1) * n + c);
                    }
                }
            }
        }

        return dsu.find(0) == dsu.find(m * n - 1);
    }
};
