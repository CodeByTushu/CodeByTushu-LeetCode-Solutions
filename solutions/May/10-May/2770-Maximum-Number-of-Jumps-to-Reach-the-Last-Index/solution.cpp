/**
 * Problem: LeetCode 2770 - Maximum Number of Jumps to Reach the Last Index
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumJumps(vector<int>& nums, int target) {
        int n = nums.size();
        vector<int> dp(n, -1);
        dp[0] = 0;

        for (int i = 1; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] != -1) {
                    long long diff = (long long)nums[i] - nums[j];
                    if (diff >= -target && diff <= target) {
                        dp[i] = max(dp[i], dp[j] + 1);
                    }
                }
            }
        }

        return dp[n - 1];
    }
};
