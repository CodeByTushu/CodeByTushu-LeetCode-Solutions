#include <vector>
#include <string>
#include <queue>
#include <unordered_map>
#include <array>

using namespace std;

/**
 * Problem: LeetCode 3568 - Minimum Moves to Clean the Classroom
 * Language: C++ (C++17 / C++20)
 * Approach: Breadth-First Search (BFS) with Bitmask State Tracking
 * Time Complexity: O(M * N * Energy * 2^L)
 * Space Complexity: O(M * N * Energy * 2^L)
 */
class Solution {
public:
    int minMoves(vector<string>& classroom, int energy) {
        int m = classroom.size();
        int n = classroom[0].size();

        int startR = -1, startC = -1;
        vector<pair<int, int>> litters;
        vector<vector<bool>> isReset(m, vector<bool>(n, false));

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                char c = classroom[i][j];
                if (c == 'S') {
                    startR = i;
                    startC = j;
                } else if (c == 'L') {
                    litters.emplace_back(i, j);
                } else if (c == 'R') {
                    isReset[i][j] = true;
                }
            }
        }

        int totalLitter = litters.size();
        int fullMask = (1 << totalLitter) - 1;

        unordered_map<int, int> litterIndex;
        for (int k = 0; k < totalLitter; ++k) {
            litterIndex[litters[k].first * n + litters[k].second] = k;
        }

        int initMask = 0;
        int startCoord = startR * n + startC;
        if (litterIndex.count(startCoord)) {
            initMask |= (1 << litterIndex[startCoord]);
        }

        // visited state: [r][c][energy][mask]
        vector<vector<vector<vector<bool>>>> visited(
            m, vector<vector<vector<bool>>>(
                n, vector<vector<bool>>(
                    energy + 1, vector<bool>(fullMask + 1, false))));

        // Queue entry: {row, col, energy, mask, moves}
        queue<array<int, 5>> q;
        q.push({startR, startC, energy, initMask, 0});
        visited[startR][startC][energy][initMask] = true;

        const int dr[] = {-1, 1, 0, 0};
        const int dc[] = {0, 0, -1, 1};

        while (!q.empty()) {
            auto [r, c, e, mask, moves] = q.front();
            q.pop();

            if (mask == fullMask) {
                return moves;
            }

            if (e == 0) {
                continue;
            }

            for (int d = 0; d < 4; ++d) {
                int nr = r + dr[d];
                int nc = c + dc[d];

                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (classroom[nr][nc] == 'X') continue;

                int ne = isReset[nr][nc] ? energy : e - 1;
                int newMask = mask;
                int nCoord = nr * n + nc;
                if (litterIndex.count(nCoord)) {
                    newMask |= (1 << litterIndex[nCoord]);
                }

                if (!visited[nr][nc][ne][newMask]) {
                    visited[nr][nc][ne][newMask] = true;
                    q.push({nr, nc, ne, newMask, moves + 1});
                }
            }
        }

        return -1;
    }
};
