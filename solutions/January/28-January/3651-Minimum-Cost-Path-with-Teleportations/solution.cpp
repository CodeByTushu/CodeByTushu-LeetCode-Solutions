/**
 * Problem: LeetCode 3651 - Minimum Cost Path with Teleportations
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 * 
 * Dynamic Programming + Suffix Minimum Optimization
 * Time Complexity: O(k * (m * n + maxVal))
 * Space Complexity: O(m * n + maxVal)
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minCost(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();

        int maxVal = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                maxVal = max(maxVal, grid[r][c]);
            }
        }

        const int INF = 1e9;
        vector<vector<int>> dp(m, vector<int>(n, INF));

        // Base case: starting at (0, 0) costs 0
        dp[0][0] = 0;

        // Base layer (0 teleportations): normal moves only
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (r > 0 && dp[r - 1][c] != INF) {
                    dp[r][c] = min(dp[r][c], dp[r - 1][c] + grid[r][c]);
                }
                if (c > 0 && dp[r][c - 1] != INF) {
                    dp[r][c] = min(dp[r][c], dp[r][c - 1] + grid[r][c]);
                }
            }
        }

        vector<int> minAtVal(maxVal + 1);
        vector<int> suffMin(maxVal + 1);

        // Up to k teleportations
        for (int t = 0; t < k; ++t) {
            fill(minAtVal.begin(), minAtVal.end(), INF);

            // Record minimum cost reachable at each cell value
            for (int r = 0; r < m; ++r) {
                for (int c = 0; c < n; ++c) {
                    int val = grid[r][c];
                    minAtVal[val] = min(minAtVal[val], dp[r][c]);
                }
            }

            // suffMin[v] = min cost to reach any cell with value >= v
            int curMin = INF;
            for (int v = maxVal; v >= 0; --v) {
                curMin = min(curMin, minAtVal[v]);
                suffMin[v] = curMin;
            }

            vector<vector<int>> nextDp(m, vector<int>(n, INF));

            // Teleportation step (cost 0)
            for (int r = 0; r < m; ++r) {
                for (int c = 0; c < n; ++c) {
                    nextDp[r][c] = min(dp[r][c], suffMin[grid[r][c]]);
                }
            }

            // Normal moves step after teleportation
            for (int r = 0; r < m; ++r) {
                for (int c = 0; c < n; ++c) {
                    if (r > 0 && nextDp[r - 1][c] != INF) {
                        nextDp[r][c] = min(nextDp[r][c], nextDp[r - 1][c] + grid[r][c]);
                    }
                    if (c > 0 && nextDp[r][c - 1] != INF) {
                        nextDp[r][c] = min(nextDp[r][c], nextDp[r][c - 1] + grid[r][c]);
                    }
                }
            }

            dp = move(nextDp);
        }

        return dp[m - 1][n - 1];
    }
};
