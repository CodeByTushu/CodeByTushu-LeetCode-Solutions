/**
 * Problem: LeetCode 3010 - Divide an Array Into Subarrays With Minimum Cost I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumCost(vector<int>& nums) {
        // The first subarray always begins at index 0, fixing nums[0].
        int firstCost = nums[0];
        int min1 = INT_MAX;
        int min2 = INT_MAX;

        for (size_t i = 1; i < nums.size(); ++i) {
            if (nums[i] < min1) {
                min2 = min1;
                min1 = nums[i];
            } else if (nums[i] < min2) {
                min2 = nums[i];
            }
        }

        return firstCost + min1 + min2;
    }
};
