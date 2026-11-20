/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxSelectedElements(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        // dp[v] = length of longest consecutive chain ending at value v
        vector<int> dp(1000003, 0);
        int ans = 1;

        for (int x : nums) {
            // Update x + 1 before x to prevent using current element twice
            dp[x + 1] = dp[x] + 1;
            dp[x] = dp[x - 1] + 1;

            ans = max(ans, max(dp[x], dp[x + 1]));
        }

        return ans;
    }
};
