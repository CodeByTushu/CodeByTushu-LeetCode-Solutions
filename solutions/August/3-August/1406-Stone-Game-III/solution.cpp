#include <vector>
#include <string>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 1406 - Stone Game III
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            int take = 0;
            int best = INT_MIN;
            for (int k = 0; k < 3 && i + k < n; k++) {
                take += stoneValue[i + k];
                best = max(best, take - dp[i + k + 1]);
            }
            dp[i] = best;
        }

        if (dp[0] > 0) return "Alice";
        if (dp[0] < 0) return "Bob";
        return "Tie";
    }
};
