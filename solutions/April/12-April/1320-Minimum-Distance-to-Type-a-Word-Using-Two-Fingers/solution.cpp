/**
 * Problem: LeetCode 1320 - Minimum Distance to Type a Word Using Two Fingers
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
private:
    int dist(int a, int b) {
        if (a == 26 || b == 26) return 0;
        int r1 = a / 6, c1 = a % 6;
        int r2 = b / 6, c2 = b % 6;
        return abs(r1 - r2) + abs(c1 - c2);
    }

public:
    int minimumDistance(string word) {
        vector<int> dp(27, INT_MAX);
        dp[26] = 0;

        for (int i = 1; i < (int)word.size(); ++i) {
            int curr = word[i] - 'A';
            int prev = word[i - 1] - 'A';
            vector<int> nextDp(27, INT_MAX);

            for (int j = 0; j < 27; ++j) {
                if (dp[j] == INT_MAX) continue;

                cost1_update: {
                    int cost1 = dp[j] + dist(prev, curr);
                    nextDp[j] = min(nextDp[j], cost1);
                }

                cost2_update: {
                    int cost2 = dp[j] + dist(j, curr);
                    nextDp[prev] = min(nextDp[prev], cost2);
                }
            }

            dp = move(nextDp);
        }

        int minCost = INT_MAX;
        for (int cost : dp) {
            minCost = min(minCost, cost);
        }
        return minCost;
    }
};
