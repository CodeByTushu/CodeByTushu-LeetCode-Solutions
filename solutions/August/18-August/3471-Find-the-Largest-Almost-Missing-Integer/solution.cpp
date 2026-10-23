#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3471 - Find the Largest Almost Missing Integer
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int largestInteger(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> count(51, 0);

        for (int start = 0; start <= n - k; ++start) {
            vector<bool> seen(51, false);
            for (int i = start; i < start + k; ++i) {
                seen[nums[i]] = true;
            }
            for (int v = 0; v <= 50; ++v) {
                if (seen[v]) {
                    count[v]++;
                }
            }
        }

        int ans = -1;
        for (int v = 0; v <= 50; ++v) {
            if (count[v] == 1) {
                ans = v;
            }
        }

        return ans;
    }
};
