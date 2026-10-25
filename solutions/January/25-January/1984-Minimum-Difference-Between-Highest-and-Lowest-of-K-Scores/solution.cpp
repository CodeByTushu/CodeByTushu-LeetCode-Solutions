/**
 * Problem: LeetCode 1984 - Minimum Difference Between Highest and Lowest of K Scores
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 * 
 * Sorting + Sliding Window Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        if (k <= 1) {
            return 0;
        }

        sort(nums.begin(), nums.end());
        int minDiff = INT_MAX;

        for (int i = 0; i + k - 1 < static_cast<int>(nums.size()); i++) {
            int currentDiff = nums[i + k - 1] - nums[i];
            minDiff = min(minDiff, currentDiff);
        }

        return minDiff;
    }
};
