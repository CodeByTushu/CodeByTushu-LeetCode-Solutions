/**
 * Problem: LeetCode 874 - Walking Robot Simulation
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <unordered_set>
#include <algorithm>

using namespace std;

class Solution {
public:
    int robotSim(vector<int>& commands, vector<vector<int>>& obstacles) {
        unordered_set<long long> obstacleSet;
        obstacleSet.reserve(obstacles.size());
        for (const auto& obs : obstacles) {
            long long key = (((long long)obs[0]) << 32) | ((unsigned int)obs[1]);
            obstacleSet.insert(key);
        }

        // 0: North, 1: East, 2: South, 3: West
        int dx[4] = {0, 1, 0, -1};
        int dy[4] = {1, 0, -1, 0};
        int d = 0;

        int x = 0;
        int y = 0;
        int maxDistSq = 0;

        for (int cmd : commands) {
            if (cmd == -1) {
                d = (d + 1) % 4;
            } else if (cmd == -2) {
                d = (d + 3) % 4;
            } else {
                for (int step = 0; step < cmd; step++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    long long nextKey = (((long long)nx) << 32) | ((unsigned int)ny);
                    if (obstacleSet.count(nextKey)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    maxDistSq = max(maxDistSq, x * x + y * y);
                }
            }
        }

        return maxDistSq;
    }
};
