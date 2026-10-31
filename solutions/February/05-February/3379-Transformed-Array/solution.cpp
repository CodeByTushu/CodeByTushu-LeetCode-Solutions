/**
 * Problem: LeetCode 3379 - Transformed Array
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> constructTransformedArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);

        for (int i = 0; i < n; i++) {
            // Normalize non-positive modulo results to standard positive circular index in [0, n - 1]
            int targetIndex = ((i + nums[i]) % n + n) % n;
            result[i] = nums[targetIndex];
        }

        return result;
    }
};
