/**
 * Problem: LeetCode 3789 - Minimum Cost to Acquire Required Items
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <algorithm>

class Solution {
public:
    long long minimumCost(int cost1, int cost2, int costBoth, int need1, int need2) {
        long long c1 = cost1, c2 = cost2, cb = costBoth;
        long long n1 = need1, n2 = need2;

        long long common = std::min(n1, n2);
        long long rem1 = n1 - common;
        long long rem2 = n2 - common;

        // Option 1: Buy only Type 1 and Type 2 items separately
        long long option1 = n1 * c1 + n2 * c2;

        // Option 2: Buy max(n1, n2) Type 3 items to cover both needs
        long long option2 = std::max(n1, n2) * cb;

        // Option 3: Optimal hybrid pairing for common units, cheapest choice for remaining
        long long pairCost = std::min(c1 + c2, cb);
        long long option3 = common * pairCost + rem1 * std::min(c1, cb) + rem2 * std::min(c2, cb);

        return std::min({option1, option2, option3});
    }
};
