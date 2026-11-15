/**
 * Problem: LeetCode 1524 - Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

class Solution {
public:
    int numOfSubarrays(std::vector<int>& arr) {
        const int MOD = 1'000'000'007;

        int odd = 0;
        int even = 1;
        int prefix = 0;
        long long ans = 0;

        for (int x : arr) {
            prefix = (prefix + x) % 2;

            if (prefix == 1) {
                ans += even;
                odd++;
            } else {
                ans += odd;
                even++;
            }

            ans %= MOD;
        }

        return static_cast<int>(ans);
    }
};
