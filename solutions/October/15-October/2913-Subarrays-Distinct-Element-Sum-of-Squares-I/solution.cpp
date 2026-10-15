#include <vector>
#include <unordered_set>

using namespace std;

/**
 * Problem: LeetCode 2913 - Subarrays Distinct Element Sum of Squares I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int sumCounts(vector<int>& nums) {
        int n = nums.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> distinct;
            for (int j = i; j < n; j++) {
                distinct.insert(nums[j]);
                int count = distinct.size();
                total += count * count;
            }
        }
        return total;
    }
};
