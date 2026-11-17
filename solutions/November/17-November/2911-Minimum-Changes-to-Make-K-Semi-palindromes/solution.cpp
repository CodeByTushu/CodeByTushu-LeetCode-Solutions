/**
 * Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumChanges(string s, int k) {
        int n = s.length();
        const int INF = 1000000;

        vector<vector<int>> cost(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int len = j - i + 1;
                if (len == 1) {
                    cost[i][j] = INF;
                    continue;
                }

                int best = INF;
                for (int d = 1; d < len; d++) {
                    if (len % d != 0) continue;

                    int changes = 0;
                    int m = len / d;
                    for (int r = 0; r < d; r++) {
                        for (int a = 0, b = m - 1; a < b; a++, b--) {
                            if (s[i + r + a * d] != s[i + r + b * d]) {
                                changes++;
                            }
                        }
                    }
                    best = min(best, changes);
                }
                cost[i][j] = best;
            }
        }

        vector<vector<int>> dp(k + 1, vector<int>(n + 1, INF));
        dp[0][0] = 0;

        for (int j = 1; j <= k; j++) {
            for (int p = 2 * j; p <= n; p++) {
                for (int q = 2 * (j - 1); q <= p - 2; q++) {
                    if (dp[j - 1][q] >= INF) continue;
                    dp[j][p] = min(dp[j][p], dp[j - 1][q] + cost[q][p - 1]);
                }
            }
        }

        return dp[k][n];
    }
};
