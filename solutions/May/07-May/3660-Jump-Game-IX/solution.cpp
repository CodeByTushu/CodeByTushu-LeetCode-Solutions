/**
 * Problem: LeetCode 3660 - Jump Game IX
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    vector<int> maxValue(vector<int>& nums) {
        int n = nums.size();
        vector<int> preMax(n);
        preMax[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            preMax[i] = max(preMax[i - 1], nums[i]);
        }

        vector<int> ans(n);
        int sufMin = INT_MAX;
        for (int i = n - 1; i >= 0; --i) {
            ans[i] = (preMax[i] > sufMin) ? ans[i + 1] : preMax[i];
            sufMin = min(sufMin, nums[i]);
        }

        return ans;
    }
};
