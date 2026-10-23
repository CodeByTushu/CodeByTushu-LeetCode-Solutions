#include <vector>

using namespace std;

/**
 * Problem: LeetCode 3737 - Count Subarrays With Majority Element I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int countMajoritySubarrays(vector<int>& nums, int target) {
        int n = nums.size();
        int ans = 0;

        for (int i = 0; i < n; i++) {
            int cnt = 0;

            for (int j = i; j < n; j++) {
                if (nums[j] == target) {
                    cnt++;
                }

                int len = j - i + 1;

                if (cnt * 2 > len) {
                    ans++;
                }
            }
        }

        return ans;
    }
};
