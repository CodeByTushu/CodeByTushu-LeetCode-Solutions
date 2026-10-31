/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int numberOfStableArrays(int zero, int one, int limit) {
        const int MOD = 1'000'000'007;

        // dp0[i][j]: valid stable arrays with i zeros and j ones ending in 0
        // dp1[i][j]: valid stable arrays with i zeros and j ones ending in 1
        vector<vector<int>> dp0(zero + 1, vector<int>(one + 1, 0));
        vector<vector<int>> dp1(zero + 1, vector<int>(one + 1, 0));

        // Base cases
        for (int i = 1; i <= min(zero, limit); i++) {
            dp0[i][0] = 1;
        }
        for (int j = 1; j <= min(one, limit); j++) {
            dp1[0][j] = 1;
        }

        // State transitions
        for (int i = 1; i <= zero; i++) {
            for (int j = 1; j <= one; j++) {
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
                if (i > limit) {
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
                }

                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
                if (j > limit) {
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
                }
            }
        }

        return (dp0[zero][one] + dp1[zero][one]) % MOD;
    }
};
