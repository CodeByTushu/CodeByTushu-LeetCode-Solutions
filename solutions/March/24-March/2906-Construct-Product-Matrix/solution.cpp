/**
 * Problem: 2906. Construct Product Matrix
 * Difficulty: Medium
 * Language: C++
 * 
 * Approach:
 * Two-pass prefix and suffix product accumulation in row-major order.
 * In the first pass, p[i][j] stores the prefix product of all preceding elements modulo 12345.
 * In the second pass, p[i][j] is multiplied by the suffix product of all succeeding elements modulo 12345.
 * 
 * Time Complexity: O(n * m)
 * Space Complexity: O(1) auxiliary space (excluding output matrix)
 */

#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> constructProductMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> p(n, vector<int>(m));
        const int MOD = 12345;

        long long prefix = 1;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                p[i][j] = prefix;
                prefix = (prefix * (grid[i][j] % MOD)) % MOD;
            }
        }

        long long suffix = 1;
        for (int i = n - 1; i >= 0; --i) {
            for (int j = m - 1; j >= 0; --j) {
                p[i][j] = (p[i][j] * suffix) % MOD;
                suffix = (suffix * (grid[i][j] % MOD)) % MOD;
            }
        }

        return p;
    }
};
