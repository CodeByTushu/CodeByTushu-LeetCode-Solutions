#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<int> suffixSum(n + 1, 0);
        for (int i = n - 1; i >= 0; --i) {
            suffixSum[i] = suffixSum[i + 1] + piles[i];
        }

        vector<vector<int>> memo(n, vector<int>(n + 1, -1));
        return solve(0, 1, piles, suffixSum, memo);
    }

private:
    int solve(int i, int m, const vector<int>& piles, const vector<int>& suffixSum, vector<vector<int>>& memo) {
        int n = piles.size();

        // Current player can grab everything remaining
        if (i + 2 * m >= n) {
            return suffixSum[i];
        }

        if (memo[i][m] != -1) {
            return memo[i][m];
        }

        int best = 0;
        for (int x = 1; x <= 2 * m; ++x) {
            int opponentGets = solve(i + x, max(m, x), piles, suffixSum, memo);
            best = max(best, suffixSum[i] - opponentGets);
        }

        return memo[i][m] = best;
    }
};
