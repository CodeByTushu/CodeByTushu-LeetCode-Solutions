#include <vector>

using namespace std;

/**
 * Problem: LeetCode 3644 - Maximum K to Sort a Permutation
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int sortPermutation(vector<int>& nums) {
        int n = nums.size();
        int ans = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                ans &= nums[i];
            }
        }
        return ans == -1 ? 0 : ans;
    }
};
