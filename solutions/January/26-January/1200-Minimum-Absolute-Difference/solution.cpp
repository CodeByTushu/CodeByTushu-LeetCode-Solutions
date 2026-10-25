/**
 * Problem: LeetCode 1200 - Minimum Absolute Difference
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 * 
 * Sorting + Linear Scan Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (excluding output list)
 */

#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        sort(arr.begin(), arr.end());

        int minDiff = INT_MAX;
        for (size_t i = 1; i < arr.size(); i++) {
            minDiff = min(minDiff, arr[i] - arr[i - 1]);
        }

        vector<vector<int>> result;
        for (size_t i = 1; i < arr.size(); i++) {
            if (arr[i] - arr[i - 1] == minDiff) {
                result.push_back({arr[i - 1], arr[i]});
            }
        }

        return result;
    }
};
