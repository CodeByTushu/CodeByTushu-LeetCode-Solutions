#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

class Solution {
private:
    static constexpr int MOD = 1'000'000'007;

public:
    int subsequencePairCount(vector<int>& nums) {
        int max_val = *max_element(nums.begin(), nums.end());
        
        // dp[g1][g2] stores the count of pairs of disjoint subsequences
        // with running GCD g1 for the first subsequence and g2 for the second (0 means empty).
        vector<vector<int>> dp(max_val + 1, vector<int>(max_val + 1, 0));
        dp[0][0] = 1;

        for (int num : nums) {
            vector<vector<int>> next_dp = dp;

            for (int g1 = 0; g1 <= max_val; ++g1) {
                for (int g2 = 0; g2 <= max_val; ++g2) {
                    int val = dp[g1][g2];
                    if (val == 0) continue;

                    // Option 1: Place num into the first subsequence
                    int ng1 = (g1 == 0) ? num : std::gcd(g1, num);
                    next_dp[ng1][g2] = (next_dp[ng1][g2] + val) % MOD;

                    // Option 2: Place num into the second subsequence
                    int ng2 = (g2 == 0) ? num : std::gcd(g2, num);
                    next_dp[g1][ng2] = (next_dp[g1][ng2] + val) % MOD;
                }
            }

            dp = std::move(next_dp);
        }

        long long ans = 0;
        for (int g = 1; g <= max_val; ++g) {
            ans = (ans + dp[g][g]) % MOD;
        }

        return static_cast<int>(ans);
    }
};
