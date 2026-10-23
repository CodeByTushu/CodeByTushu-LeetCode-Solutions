/**
 * Problem: LeetCode 3300 - Minimum Element After Replacement With Digit Sum
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minElement(vector<int>& nums) {
        int minVal = INT_MAX;

        for (int num : nums) {
            int sum = 0;
            int temp = num;
            while (temp > 0) {
                sum += temp % 10;
                temp /= 10;
            }
            minVal = min(minVal, sum);
        }

        return minVal;
    }
};
