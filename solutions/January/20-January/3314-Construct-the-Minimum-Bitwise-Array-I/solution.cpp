/**
 * Problem: LeetCode 3314 - Construct the Minimum Bitwise Array I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 * 
 * Bit Manipulation Approach (Trailing 1s Lowbit Clearing)
 * Time Complexity: O(n)
 * Space Complexity: O(1) auxiliary (excluding output array)
 */

#include <vector>

using namespace std;

class Solution {
public:
    vector<int> minBitwiseArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n);

        for (int i = 0; i < n; i++) {
            int p = nums[i];
            // Even prime (2) cannot be formed by x | (x + 1) because x | (x + 1) is always odd
            if (p == 2) {
                ans[i] = -1;
            } else {
                // Find the lowest set bit of (p + 1) and divide by 2 to get highest bit in trailing 1s of p
                ans[i] = p - (((p + 1) & -(p + 1)) >> 1);
            }
        }

        return ans;
    }
};
