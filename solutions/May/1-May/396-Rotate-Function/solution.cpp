#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

/**
 * Problem: LeetCode 396 - Rotate Function
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int maxRotateFunction(vector<int>& nums) {
        int n = nums.size();
        long long totalSum = 0;
        long long currentF = 0;

        for (int i = 0; i < n; i++) {
            totalSum += nums[i];
            currentF += 1LL * i * nums[i];
        }

        long long maxF = currentF;

        for (int k = 1; k < n; k++) {
            currentF += totalSum - 1LL * n * nums[n - k];
            maxF = max(maxF, currentF);
        }

        return static_cast<int>(maxF);
    }
};
