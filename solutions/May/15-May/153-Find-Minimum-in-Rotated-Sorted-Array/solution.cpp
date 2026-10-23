/**
 * Problem: LeetCode 153 - Find Minimum in Rotated Sorted Array
 * Difficulty: Medium
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

        // Binary search for the inflection point (minimum element)
        while (left < right) {
            int mid = left + (right - left) / 2;

            // If middle element is greater than rightmost element,
            // the inflection point lies in the right half (mid + 1 to right)
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                // Otherwise, the minimum element is at mid or in the left half (left to mid)
                right = mid;
            }
        }

        return nums[left];
    }
};
