/**
 * Problem: LeetCode 1975 - Maximum Matrix Sum
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <cmath>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    long long maxMatrixSum(vector<vector<int>>& matrix) {
        long long totalSum = 0;
        int minAbs = INT_MAX;
        int negCount = 0;

        for (const auto& row : matrix) {
            for (int val : row) {
                if (val < 0) {
                    negCount++;
                }
                int absVal = abs(val);
                totalSum += absVal;
                minAbs = min(minAbs, absVal);
            }
        }

        if (negCount % 2 == 0) {
            return totalSum;
        }
        return totalSum - 2LL * minAbs;
    }
};
