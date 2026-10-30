/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <set>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> getBiggestThree(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        set<int> sums;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                // Area 0 rhombus
                sums.insert(grid[r][c]);

                // Area > 0 rhombuses with radius L
                for (int L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                    int sum = 0;
                    for (int i = 0; i < L; i++) {
                        sum += grid[r - L + i][c + i];     // top to right
                        sum += grid[r + i][c + L - i];     // right to bottom
                        sum += grid[r + L - i][c - i];     // bottom to left
                        sum += grid[r - i][c - L + i];     // left to top
                    }
                    sums.insert(sum);
                }
            }
        }

        vector<int> result;
        for (auto it = sums.rbegin(); it != sums.rend() && result.size() < 3; ++it) {
            result.push_back(*it);
        }
        return result;
    }
};
