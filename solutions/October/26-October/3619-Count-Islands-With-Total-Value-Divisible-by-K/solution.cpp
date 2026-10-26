/**
 * Problem: LeetCode 3619 - Count Islands With Total Value Divisible by K
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int countIslands(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        int count = 0;
        vector<int> stack(m * n);

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) continue;
                long long sum = grid[i][j];
                int top = 0;
                stack[top++] = i * n + j;
                grid[i][j] = 0;

                while (top > 0) {
                    int cur = stack[--top];
                    int r = cur / n, c = cur % n;
                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 0) continue;

                        sum += grid[nr][nc];
                        grid[nr][nc] = 0;
                        stack[top++] = nr * n + nc;
                    }
                }
                if (sum % k == 0) count++;
            }
        }
        return count;
    }
};
