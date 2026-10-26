/**
 * Problem: LeetCode 3637 - Trionic Array I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

using namespace std;

class Solution {
public:
    bool isTrionic(vector<int>& nums) {
        int n = nums.size();
        if (n < 4) {
            return false;
        }

        int i = 0;

        // Phase 1: Strictly increasing to peak p
        while (i + 1 < n && nums[i] < nums[i + 1]) {
            i++;
        }
        int p = i;
        if (p == 0 || p >= n - 2) {
            return false;
        }

        // Phase 2: Strictly decreasing to valley q
        while (i + 1 < n && nums[i] > nums[i + 1]) {
            i++;
        }
        int q = i;
        if (q == p || q >= n - 1) {
            return false;
        }

        // Phase 3: Strictly increasing to the end
        while (i + 1 < n && nums[i] < nums[i + 1]) {
            i++;
        }

        return i == n - 1;
    }
};
