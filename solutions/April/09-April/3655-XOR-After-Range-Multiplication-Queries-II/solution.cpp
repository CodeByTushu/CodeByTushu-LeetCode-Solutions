/**
 * Problem: LeetCode 3655 - XOR After Range Multiplication Queries II
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

class Solution {
private:
    static constexpr long long MOD = 1000000007LL;

    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    long long modInverse(long long base) {
        return power(base, MOD - 2);
    }

public:
    int xorAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        int B = max(1, (int)sqrt(n));

        vector<vector<vector<int>>> smallK(B);

        for (const auto& q : queries) {
            int l = q[0];
            int r = q[1];
            int k = q[2];
            int v = q[3];

            if (k >= B) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int)((1LL * nums[idx] * v) % MOD);
                }
            } else {
                smallK[k].push_back(q);
            }
        }

        for (int k = 1; k < B; ++k) {
            if (smallK[k].empty()) continue;

            vector<long long> diff(n + k, 1);

            for (const auto& q : smallK[k]) {
                int l = q[0];
                int r = q[1];
                int v = q[3];

                diff[l] = (diff[l] * v) % MOD;
                int steps = (r - l) / k;
                int next = l + (steps + 1) * k;
                diff[next] = (diff[next] * modInverse(v)) % MOD;
            }

            for (int i = 0; i < n; ++i) {
                if (i >= k) {
                    diff[i] = (diff[i] * diff[i - k]) % MOD;
                }
                nums[i] = (int)((1LL * nums[i] * diff[i]) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
};
