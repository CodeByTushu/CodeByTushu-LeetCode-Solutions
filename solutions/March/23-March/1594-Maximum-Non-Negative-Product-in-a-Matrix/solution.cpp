/**
 * Problem: LeetCode 1594 - Maximum Non Negative Product in a Matrix
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxProductPath(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<long long>> maxProd(m, vector<long long>(n, 0));
        vector<vector<long long>> minProd(m, vector<long long>(n, 0));

        maxProd[0][0] = minProd[0][0] = grid[0][0];

        for (int j = 1; j < n; ++j) {
            maxProd[0][j] = minProd[0][j] = maxProd[0][j - 1] * grid[0][j];
        }

        for (int i = 1; i < m; ++i) {
            maxProd[i][0] = minProd[i][0] = maxProd[i - 1][0] * grid[i][0];
        }

        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                long long val = grid[i][j];
                long long c1 = maxProd[i - 1][j] * val;
                long long c2 = minProd[i - 1][j] * val;
                long long c3 = maxProd[i][j - 1] * val;
                long long c4 = minProd[i][j - 1] * val;

                maxProd[i][j] = max({c1, c2, c3, c4});
                minProd[i][j] = min({c1, c2, c3, c4});
            }
        }

        long long ans = maxProd[m - 1][n - 1];
        if (ans < 0) {
            return -1;
        }

        long long MOD = 1000000007LL;
        return ans % MOD;
    }
};
