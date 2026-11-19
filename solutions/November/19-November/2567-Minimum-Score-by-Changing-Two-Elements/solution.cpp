/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimizeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();

        // Low score can always be made 0 by duplicating an element.
        // Therefore, we only need to minimize the high score (max - min).
        int opt1 = nums[n - 1] - nums[2];     // Modify 2 smallest elements
        int opt2 = nums[n - 2] - nums[1];     // Modify 1 smallest + 1 largest element
        int opt3 = nums[n - 3] - nums[0];     // Modify 2 largest elements

        return min({opt1, opt2, opt3});
    }
};
