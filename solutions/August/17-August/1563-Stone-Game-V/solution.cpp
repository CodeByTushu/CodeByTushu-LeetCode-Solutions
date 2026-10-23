#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 1563 - Stone Game V
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
    vector<int> prefixSum;
    vector<vector<int>> memo;

    int solve(int l, int r) {
        if (l == r) return 0;
        if (memo[l][r] != -1) return memo[l][r];

        int best = 0;
        for (int m = l; m < r; ++m) {
            int leftSum = prefixSum[m + 1] - prefixSum[l];
            int rightSum = prefixSum[r + 1] - prefixSum[m + 1];

            int score = 0;
            if (leftSum < rightSum) {
                score = leftSum + solve(l, m);
            } else if (leftSum > rightSum) {
                score = rightSum + solve(m + 1, r);
            } else {
                score = leftSum + max(solve(l, m), solve(m + 1, r));
            }

            best = max(best, score);
        }

        return memo[l][r] = best;
    }

public:
    int stoneGameV(vector<int>& stoneValue) {
        int n = stoneValue.size();
        prefixSum.assign(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
        }

        memo.assign(n, vector<int>(n, -1));
        return solve(0, n - 1);
    }
};
