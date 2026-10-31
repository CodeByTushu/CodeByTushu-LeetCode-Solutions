#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 2812 - Find the Safest Path in a Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
private:
    int n;
    vector<vector<int>> dist;
    const int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    bool canReach(int limit) {
        if (dist[0][0] < limit) return false;

        vector<vector<bool>> vis(n, vector<bool>(n, false));
        queue<pair<int, int>> q;

        q.push({0, 0});
        vis[0][0] = true;

        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();

            if (r == n - 1 && c == n - 1) return true;

            for (const auto& d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr >= 0 && nr < n && nc >= 0 && nc < n &&
                    !vis[nr][nc] && dist[nr][nc] >= limit) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }

        return false;
    }

public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        n = grid.size();
        dist.assign(n, vector<int>(n, -1));

        queue<pair<int, int>> q;

        // Multi-source BFS from all thieves
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }

        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();

            for (const auto& d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }

        int low = 0, high = 2 * n;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canReach(mid)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return high;
    }
};
