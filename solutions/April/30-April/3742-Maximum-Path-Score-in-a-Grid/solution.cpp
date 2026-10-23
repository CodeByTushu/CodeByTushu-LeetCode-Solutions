/**
 * Problem: LeetCode 3742 - Maximum Path Score in a Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxPathScore(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        int maxCost = min(k, m + n - 1);

        vector<vector<int>> dp(n, vector<int>(maxCost + 1, -1));

        int cost0 = (grid[0][0] == 0 ? 0 : 1);
        int score0 = grid[0][0];
        if (cost0 <= maxCost) {
            dp[0][cost0] = score0;
        } else {
            return -1;
        }

        // First row
        for (int c = 1; c < n; c++) {
            int cost = (grid[0][c] == 0 ? 0 : 1);
            int score = grid[0][c];
            for (int w = cost; w <= maxCost; w++) {
                if (dp[c - 1][w - cost] != -1) {
                    dp[c][w] = dp[c - 1][w - cost] + score;
                }
            }
        }

        // Remaining rows
        for (int r = 1; r < m; r++) {
            vector<vector<int>> nextDp(n, vector<int>(maxCost + 1, -1));
            for (int c = 0; c < n; c++) {
                int cost = (grid[r][c] == 0 ? 0 : 1);
                int score = grid[r][c];

                for (int w = cost; w <= maxCost; w++) {
                    int best = -1;
                    if (dp[c][w - cost] != -1) {
                        best = max(best, dp[c][w - cost]);
                    }
                    if (c > 0 && nextDp[c - 1][w - cost] != -1) {
                        best = max(best, nextDp[c - 1][w - cost]);
                    }
                    if (best != -1) {
                        nextDp[c][w] = best + score;
                    }
                }
            }
            dp = move(nextDp);
        }

        int maxScore = -1;
        for (int w = 0; w <= maxCost; w++) {
            maxScore = max(maxScore, dp[n - 1][w]);
        }
        return maxScore;
    }
};
