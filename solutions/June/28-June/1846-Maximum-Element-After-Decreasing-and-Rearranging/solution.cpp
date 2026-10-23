#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 1846 - Maximum Element After Decreasing and Rearranging
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end());

        int ans = 1;

        for (int i = 1; i < arr.size(); i++) {
            ans = min(arr[i], ans + 1);
        }

        return ans;
    }
};
