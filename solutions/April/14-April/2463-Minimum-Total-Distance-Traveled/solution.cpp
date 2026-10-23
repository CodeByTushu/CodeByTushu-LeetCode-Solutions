/**
 * Problem: LeetCode 2463 - Minimum Total Distance Traveled
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
public:
    long long minimumTotalDistance(vector<int>& robot, vector<vector<int>>& factory) {
        sort(robot.begin(), robot.end());
        sort(factory.begin(), factory.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });

        int n = robot.size();
        int m = factory.size();
        long long INF = 1e16;

        vector<long long> dp(n + 1, INF);
        dp[0] = 0;

        for (int j = 0; j < m; j++) {
            long long pos = factory[j][0];
            int limit = factory[j][1];
            vector<long long> nextDp = dp;

            for (int i = 1; i <= n; i++) {
                long long cost = 0;
                for (int k = 1; k <= min(i, limit); k++) {
                    cost += abs(robot[i - k] - pos);
                    if (dp[i - k] != INF) {
                        nextDp[i] = min(nextDp[i], dp[i - k] + cost);
                    }
                }
            }
            dp = nextDp;
        }

        return dp[n];
    }
};
