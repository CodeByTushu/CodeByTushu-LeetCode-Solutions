#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 2144 - Minimum Cost of Buying Candies With Discount
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int minimumCost(vector<int>& cost) {
        sort(cost.rbegin(), cost.rend());
        int total = 0;
        for (int i = 0; i < cost.size(); i++) {
            if ((i + 1) % 3 != 0) {
                total += cost[i];
            }
        }
        return total;
    }
};
