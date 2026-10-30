/**
 * Problem: 3548. Equal Sum Grid Partition II
 * Difficulty: Hard
 * Language: C++
 * 
 * Approach:
 * Partitioning requires checking if a horizontal or vertical cut can split the grid into
 * two non-empty sections of equal sum, potentially discounting at most one cell from the
 * larger section while preserving its connectivity.
 * 
 * - An R x C block with R >= 2 and C >= 2 has no articulation points; any cell can be removed.
 * - An R x 1 column or 1 x C row can only have its 2 extreme endpoint cells discounted.
 * - We check 4 configurations by rotating/transposing the grid and evaluating horizontal cuts.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */

#include <vector>
#include <unordered_set>

using namespace std;

class Solution {
public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        long long totalSum = 0;
        for (const auto& row : grid) {
            for (int val : row) {
                totalSum += val;
            }
        }

        if (canPartition(grid, totalSum)) return true;
        if (canPartition(reverseRows(grid), totalSum)) return true;
        vector<vector<int>> trans = transpose(grid);
        if (canPartition(trans, totalSum)) return true;
        if (canPartition(reverseRows(trans), totalSum)) return true;

        return false;
    }

private:
    bool canPartition(const vector<vector<int>>& grid, long long totalSum) {
        int m = grid.size();
        int n = grid[0].size();
        long long topSum = 0;
        unordered_set<long long> seen;

        for (int i = 0; i < m - 1; ++i) {
            for (int j = 0; j < n; ++j) {
                seen.insert(grid[i][j]);
                topSum += grid[i][j];
            }

            long long botSum = totalSum - topSum;
            long long diff = topSum - botSum;

            if (diff == 0) {
                return true;
            }

            if (diff > 0) {
                if (i == 0) {
                    if (n > 1 && (diff == grid[0][0] || diff == grid[0][n - 1])) {
                        return true;
                    }
                } else if (n == 1) {
                    if (diff == grid[0][0] || diff == grid[i][0]) {
                        return true;
                    }
                } else {
                    if (seen.count(diff)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    vector<vector<int>> reverseRows(const vector<vector<int>>& grid) {
        int m = grid.size();
        vector<vector<int>> rev(m);
        for (int i = 0; i < m; ++i) {
            rev[i] = grid[m - 1 - i];
        }
        return rev;
    }

    vector<vector<int>> transpose(const vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> trans(n, vector<int>(m));
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                trans[j][i] = grid[i][j];
            }
        }
        return trans;
    }
};
