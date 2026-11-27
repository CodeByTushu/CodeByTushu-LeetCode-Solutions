/**
 * Problem: LeetCode 3946 - Maximum Number of Items From Sale I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int maximumSaleItems(vector<vector<int>>& items, int budget) {
        int n = items.size();
        vector<int> f(n, 0);
        int minPrice = INT_MAX;

        for (int i = 0; i < n; i++) {
            minPrice = min(minPrice, items[i][1]);
            for (int j = 0; j < n; j++) {
                if (i != j && items[j][0] % items[i][0] == 0) {
                    f[i]++;
                }
            }
        }

        vector<int> dp(budget + 1, 0);

        // Step 1: 0/1 Knapsack for first purchase of each item
        for (int i = 0; i < n; i++) {
            int price = items[i][1];
            int value = 1 + f[i];
            for (int b = budget; b >= price; b--) {
                dp[b] = max(dp[b], dp[b - price] + value);
            }
        }

        // Step 2: Unbounded Knapsack buying extra copies of cheapest item
        for (int b = minPrice; b <= budget; b++) {
            dp[b] = max(dp[b], dp[b - minPrice] + 1);
        }

        return dp[budget];
    }
};
