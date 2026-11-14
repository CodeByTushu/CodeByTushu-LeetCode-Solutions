/**
 * Problem: LeetCode 3364 - Minimum Positive Sum Subarray
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int minimumSumSubarray(std::vector<int>& nums, int l, int r) {
        int n = static_cast<int>(nums.size());
        int ans = INT_MAX;

        for (int i = 0; i < n; ++i) {
            int sum = 0;
            for (int j = i; j < n; ++j) {
                sum += nums[j];
                int len = j - i + 1;

                if (len > r) break;
                if (len >= l && sum > 0) {
                    ans = std::min(ans, sum);
                }
            }
        }

        return ans == INT_MAX ? -1 : ans;
    }
};
