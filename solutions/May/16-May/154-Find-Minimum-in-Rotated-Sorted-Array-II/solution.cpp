/**
 * Problem: LeetCode 154 - Find Minimum in Rotated Sorted Array II
 * Difficulty: Hard
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0;
        int right = nums.size() - 1;

        // Binary search with duplicate handling
        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[right]) {
                // Inflection point is strictly in the right half
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                // Right half is sorted, inflection point is at mid or in left half
                right = mid;
            } else {
                // nums[mid] == nums[right]: duplicate detected, safely shrink right boundary
                right--;
            }
        }

        return nums[left];
    }
};
