#include <vector>

using namespace std;

/**
 * Problem: LeetCode 2161 - Partition Array According to Given Pivot
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> pivotArray(vector<int>& nums, int pivot) {
        int n = nums.size();
        vector<int> result(n);
        int index = 0;

        // Elements less than pivot
        for (int num : nums) {
            if (num < pivot) {
                result[index++] = num;
            }
        }

        // Elements equal to pivot
        for (int num : nums) {
            if (num == pivot) {
                result[index++] = num;
            }
        }

        // Elements greater than pivot
        for (int num : nums) {
            if (num > pivot) {
                result[index++] = num;
            }
        }

        return result;
    }
};
