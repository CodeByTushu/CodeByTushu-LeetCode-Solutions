#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 1621 - Number of Sets of K Non-Overlapping Line Segments
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int numberOfSets(int n, int k) {
        long long MOD = 1000000007LL;
        int total = n + k - 1;
        int choose = 2 * k;
        return combination(total, choose, MOD);
    }

private:
    long long combination(int n, int r, long long MOD) {
        if (r > n) return 0;
        vector<vector<long long>> dp(n + 1, vector<long long>(r + 1, 0));
        for (int i = 0; i <= n; i++) dp[i][0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= min(i, r); j++) {
                dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD;
            }
        }
        return dp[n][r];
    }
};
