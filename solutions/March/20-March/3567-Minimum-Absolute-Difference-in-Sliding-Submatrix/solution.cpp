/**
 * Problem: LeetCode 3567 - Minimum Absolute Difference in Sliding Submatrix
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    vector<vector<int>> minAbsDiff(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        int rows = m - k + 1;
        int cols = n - k + 1;
        vector<vector<int>> ans(rows, vector<int>(cols, 0));
        vector<int> window(k * k);

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int idx = 0;
                for (int r = 0; r < k; r++) {
                    for (int c = 0; c < k; c++) {
                        window[idx++] = grid[i + r][j + c];
                    }
                }

                sort(window.begin(), window.end());
                int minDiff = INT_MAX;

                for (int p = 1; p < window.size(); p++) {
                    if (window[p] != window[p - 1]) {
                        int diff = window[p] - window[p - 1];
                        if (diff < minDiff) {
                            minDiff = diff;
                        }
                    }
                }

                ans[i][j] = (minDiff == INT_MAX) ? 0 : minDiff;
            }
        }

        return ans;
    }
};
