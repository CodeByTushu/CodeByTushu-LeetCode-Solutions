#include <vector>

using namespace std;

/**
 * Problem: LeetCode 2089 - Find Target Indices After Sorting Array
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        int less = 0, equal = 0;
        for (int x : nums) {
            if (x < target) less++;
            else if (x == target) equal++;
        }
        vector<int> result;
        result.reserve(equal);
        for (int i = 0; i < equal; i++) {
            result.push_back(less + i);
        }
        return result;
    }
};
