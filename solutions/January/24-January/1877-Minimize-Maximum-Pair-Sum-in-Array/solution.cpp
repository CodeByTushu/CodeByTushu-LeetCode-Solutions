/**
 * Problem: LeetCode 1877 - Minimize Maximum Pair Sum in Array
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 * 
 * Greedy + Two Pointers Approach (Sorting)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int maxPairSum = 0;
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;

        while (left < right) {
            int currentSum = nums[left] + nums[right];
            maxPairSum = max(maxPairSum, currentSum);
            left++;
            right--;
        }

        return maxPairSum;
    }
};
