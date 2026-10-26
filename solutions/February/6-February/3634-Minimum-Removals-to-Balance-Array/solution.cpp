/**
 * Problem: LeetCode 3634 - Minimum Removals to Balance Array
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minRemoval(vector<int>& nums, int k) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        int maxKept = 1;
        int right = 0;

        for (int left = 0; left < n; left++) {
            // Prevent 32-bit signed integer overflow when nums[left] * k exceeds 2 * 10^9
            long long limit = (long long)nums[left] * k;
            while (right < n && nums[right] <= limit) {
                right++;
            }
            maxKept = max(maxKept, right - left);
        }

        return n - maxKept;
    }
};
