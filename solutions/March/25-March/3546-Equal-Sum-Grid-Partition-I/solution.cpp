/**
 * Problem: LeetCode 3546 - Equal Sum Grid Partition I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        long long totalSum = 0;
        vector<long long> rowSums(m, 0);
        vector<long long> colSums(n, 0);

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                long long val = grid[i][j];
                totalSum += val;
                rowSums[i] += val;
                colSums[j] += val;
            }
        }

        if (totalSum % 2 != 0) {
            return false;
        }

        long long target = totalSum / 2;

        long long runningRow = 0;
        for (int i = 0; i < m - 1; ++i) {
            runningRow += rowSums[i];
            if (runningRow == target) {
                return true;
            }
        }

        long long runningCol = 0;
        for (int j = 0; j < n - 1; ++j) {
            runningCol += colSums[j];
            if (runningCol == target) {
                return true;
            }
        }

        return false;
    }
};
