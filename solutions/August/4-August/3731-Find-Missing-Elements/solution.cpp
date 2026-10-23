#include <vector>
#include <unordered_set>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3731 - Find Missing Elements
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> findMissingElements(vector<int>& nums) {
        int min_val = nums[0], max_val = nums[0];
        unordered_set<int> present;

        for (int num : nums) {
            min_val = min(min_val, num);
            max_val = max(max_val, num);
            present.insert(num);
        }

        vector<int> result;
        for (int i = min_val; i <= max_val; i++) {
            if (present.find(i) == present.end()) {
                result.push_back(i);
            }
        }

        return result;
    }
};
