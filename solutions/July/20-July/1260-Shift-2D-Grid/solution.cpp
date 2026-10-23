#include <vector>

using namespace std;

/**
 * Problem: LeetCode 1260 - Shift 2D Grid
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        int total = m * n;

        k %= total;

        vector<vector<int>> ans(m, vector<int>(n));

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int idx = i * n + j;
                int newIdx = (idx + k) % total;

                int r = newIdx / n;
                int c = newIdx % n;

                ans[r][c] = grid[i][j];
            }
        }

        return ans;
    }
};
