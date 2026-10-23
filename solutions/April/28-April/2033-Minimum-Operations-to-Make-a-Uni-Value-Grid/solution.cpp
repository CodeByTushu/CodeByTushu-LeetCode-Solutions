/**
 * Problem: LeetCode 2033 - Minimum Operations to Make a Uni-Value Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <cstdlib>

using namespace std;

class Solution {
public:
    int minOperations(vector<vector<int>>& grid, int x) {
        int m = grid.size();
        int n = grid[0].size();
        vector<int> vals;
        vals.reserve(m * n);
        int rem = grid[0][0] % x;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] % x != rem) {
                    return -1;
                }
                vals.push_back(grid[i][j]);
            }
        }

        sort(vals.begin(), vals.end());
        int median = vals[vals.size() / 2];
        int operations = 0;

        for (int val : vals) {
            operations += abs(val - median) / x;
        }

        return operations;
    }
};
