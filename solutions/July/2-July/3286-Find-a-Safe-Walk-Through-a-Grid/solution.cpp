#include <vector>
#include <queue>
#include <tuple>

using namespace std;

/**
 * Problem: LeetCode 3286 - Find a Safe Walk Through a Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool findSafeWalk(vector<vector<int>>& grid, int health) {
        int m = grid.size(), n = grid[0].size();

        vector<vector<int>> best(m, vector<int>(n, -1));

        // Priority queue storing {health, x, y} in descending order
        priority_queue<tuple<int, int, int>> pq;

        int startHealth = health - grid[0][0];
        if (startHealth <= 0) return false;

        best[0][0] = startHealth;
        pq.push({startHealth, 0, 0});

        const int dir[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!pq.empty()) {
            auto [h, x, y] = pq.top();
            pq.pop();

            if (h != best[x][y]) continue;

            if (x == m - 1 && y == n - 1) return true;

            for (const auto& d : dir) {
                int nx = x + d[0];
                int ny = y + d[1];

                if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;

                int nh = h - grid[nx][ny];

                if (nh > 0 && nh > best[nx][ny]) {
                    best[nx][ny] = nh;
                    pq.push({nh, nx, ny});
                }
            }
        }

        return false;
    }
};
