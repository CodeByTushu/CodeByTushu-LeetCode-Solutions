/**
 * Problem: LeetCode 1895 - Largest Magic Square
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int largestMagicSquare(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();

        // Row prefix sums
        vector<vector<int>> rowSum(m, vector<int>(n + 1, 0));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                rowSum[r][c + 1] = rowSum[r][c] + grid[r][c];
            }
        }

        // Col prefix sums
        vector<vector<int>> colSum(m + 1, vector<int>(n, 0));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                colSum[r + 1][c] = colSum[r][c] + grid[r][c];
            }
        }

        auto isMagic = [&](int r, int c, int k) -> bool {
            int target = rowSum[r][c + k] - rowSum[r][c];

            // Check remaining rows
            for (int i = 1; i < k; i++) {
                if (rowSum[r + i][c + k] - rowSum[r + i][c] != target) {
                    return false;
                }
            }

            // Check all columns
            for (int j = 0; j < k; j++) {
                if (colSum[r + k][c + j] - colSum[r][c + j] != target) {
                    return false;
                }
            }

            // Check main diagonal
            int d1 = 0;
            for (int i = 0; i < k; i++) {
                d1 += grid[r + i][c + i];
            }
            if (d1 != target) return false;

            // Check anti-diagonal
            int d2 = 0;
            for (int i = 0; i < k; i++) {
                d2 += grid[r + i][c + k - 1 - i];
            }
            if (d2 != target) return false;

            return true;
        };

        for (int k = min(m, n); k >= 2; k--) {
            for (int r = 0; r <= m - k; r++) {
                for (int c = 0; c <= n - k; c++) {
                    if (isMagic(r, c, k)) {
                        return k;
                    }
                }
            }
        }

        return 1;
    }
};
