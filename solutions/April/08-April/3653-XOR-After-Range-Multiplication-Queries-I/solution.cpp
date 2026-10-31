/**
 * Problem: LeetCode 3653 - XOR After Range Multiplication Queries I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int xorAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        long long MOD = 1000000007LL;

        for (const auto& query : queries) {
            int l = query[0];
            int r = query[1];
            int k = query[2];
            int v = query[3];

            for (int idx = l; idx <= r; idx += k) {
                nums[idx] = (int) ((1LL * nums[idx] * v) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
};
