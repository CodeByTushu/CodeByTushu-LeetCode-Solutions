/**
 * Problem: LeetCode 1914 - Cyclically Rotating a Grid
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> rotateGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        int layers = min(m, n) / 2;

        for (int l = 0; l < layers; ++l) {
            int r1 = l, c1 = l;
            int r2 = m - 1 - l, c2 = n - 1 - l;

            // Collect coordinates along counter-clockwise perimeter
            vector<pair<int, int>> positions;
            // 1. Left col: top to bottom
            for (int r = r1; r <= r2; ++r) positions.push_back({r, c1});
            // 2. Bottom row: left to right
            for (int c = c1 + 1; c <= c2; ++c) positions.push_back({r2, c});
            // 3. Right col: bottom to top
            for (int r = r2 - 1; r >= r1; --r) positions.push_back({r, c2});
            // 4. Top row: right to left
            for (int c = c2 - 1; c >= c1 + 1; --c) positions.push_back({r1, c});

            int L = positions.size();
            vector<int> vals(L);
            for (int i = 0; i < L; ++i) {
                vals[i] = grid[positions[i].first][positions[i].second];
            }

            int shift = k % L;
            for (int i = 0; i < L; ++i) {
                auto [tr, tc] = positions[(i + shift) % L];
                grid[tr][tc] = vals[i];
            }
        }

        return grid;
    }
};
