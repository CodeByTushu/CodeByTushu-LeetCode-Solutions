#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 3942 - Minimum Operations to Sort a Permutation
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int n = nums.size();
        int best = INT_MAX;

        // Check if array is cyclically ascending
        int s = nums[0];
        bool asc = true;
        for (int i = 0; i < n; i++) {
            if (nums[i] != (i + s) % n) {
                asc = false;
                break;
            }
        }
        if (asc) {
            if (s == 0) return 0;
            best = min(best, min(n - s, s + 2));
        }

        // Check if array is cyclically descending
        int c = nums[0];
        bool desc = true;
        for (int i = 0; i < n; i++) {
            if (nums[i] != ((c - i) % n + n) % n) {
                desc = false;
                break;
            }
        }
        if (desc) {
            int t = (c + 1) % n;
            best = min(best, min(t, n - t) + 1);
        }

        return best == INT_MAX ? -1 : best;
    }
};
