/**
 * Problem: LeetCode 3665 - Twisted Mirror Path Count
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

using namespace std;

class Solution {
public:
    int uniquePaths(vector<vector<int>>& grid) {
        const int MOD = 1'000'000'007;
        int m = grid.size();
        int n = grid[0].size();

        // f[i][j][0] = ways entering (i, j) moving Right
        // f[i][j][1] = ways entering (i, j) moving Down
        vector<vector<vector<int>>> f(m + 1, vector<vector<int>>(n + 1, vector<int>(2, 0)));
        f[0][0][0] = 1;

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int fromRight = f[i][j][0];
                int fromDown = f[i][j][1];

                if (grid[i][j] == 0) {
                    int total = (fromRight + fromDown) % MOD;
                    // move right
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                    // move down
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
                } else {
                    // entered mirror moving right -> deflected down
                    f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                    // entered mirror moving down -> deflected right
                    f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
                }
            }
        }

        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
    }
};
