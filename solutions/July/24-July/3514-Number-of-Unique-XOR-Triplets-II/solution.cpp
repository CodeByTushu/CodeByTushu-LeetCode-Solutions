#include <vector>
#include <cstring>

/**
 * Problem: LeetCode 3514 - Number of Unique XOR Triplets II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int uniqueXorTriplets(std::vector<int>& nums) {
        const int MAX = 2048;
        bool dp[4][MAX];
        std::memset(dp, 0, sizeof(dp));
        dp[0][0] = true;

        for (int x : nums) {
            bool next[4][MAX];
            std::memcpy(next, dp, sizeof(dp));

            // Use current element up to 3 times (i <= j <= k allows repeats)
            for (int t = 0; t < 3; t++) {
                for (int k = 2; k >= 0; k--) {
                    for (int v = 0; v < MAX; v++) {
                        if (next[k][v]) {
                            next[k + 1][v ^ x] = true;
                        }
                    }
                }
            }

            std::memcpy(dp, next, sizeof(dp));
        }

        int ans = 0;
        for (int v = 0; v < MAX; v++) {
            if (dp[3][v]) ans++;
        }
        return ans;
    }
};
