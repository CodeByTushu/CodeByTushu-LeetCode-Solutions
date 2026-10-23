#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 3876 - Construct Uniform Parity Array II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool uniformArray(vector<int>& nums1) {
        return canMakeAll(nums1, 0) || canMakeAll(nums1, 1);
    }

private:
    bool canMakeAll(const vector<int>& nums, int targetParity) {
        int globalMin[2] = {INT_MAX, INT_MAX};
        for (int x : nums) {
            globalMin[x % 2] = min(globalMin[x % 2], x);
        }

        for (int x : nums) {
            int curParity = x % 2;
            if (curParity == targetParity) {
                continue;
            }
            int neededJParity = (targetParity + curParity) % 2;
            if (globalMin[neededJParity] >= x) {
                return false;
            }
        }
        return true;
    }
};
