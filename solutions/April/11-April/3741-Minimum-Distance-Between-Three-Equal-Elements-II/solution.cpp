/**
 * Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        int n = nums.size();
        vector<int> prev1(n + 1, -1);
        vector<int> prev2(n + 1, -1);
        int minDistance = INT_MAX;

        for (int i = 0; i < n; ++i) {
            int val = nums[i];
            if (prev2[val] != -1) {
                minDistance = min(minDistance, 2 * (i - prev2[val]));
            }
            prev2[val] = prev1[val];
            prev1[val] = i;
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
