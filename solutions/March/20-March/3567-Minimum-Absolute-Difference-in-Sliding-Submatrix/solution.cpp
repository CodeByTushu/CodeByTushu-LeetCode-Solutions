/**
 * Problem: 3567. Minimum Absolute Difference in Sliding Submatrix
 * Difficulty: Medium
 * Language: C++
 * 
 * Approach:
 * For each valid submatrix of size k x k starting at (i, j),
 * collect all k * k elements into a vector and sort them.
 * Iterate through the sorted elements to compute the difference between
 * adjacent distinct elements. The minimum of these differences is stored in ans[i][j].
 * If all elements are equal or k == 1, ans[i][j] is 0.
 * 
 * Time Complexity: O((m - k + 1) * (n - k + 1) * k^2 * log(k))
 * Space Complexity: O(k^2) auxiliary space
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
