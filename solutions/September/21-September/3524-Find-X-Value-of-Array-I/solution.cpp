#include <vector>

class Solution {
public:
    std::vector<long long> resultArray(std::vector<int>& nums, int k) {
        int n = nums.size();
        std::vector<long long> result(k, 0);
        std::vector<long long> dp(k, 0);
        for (int r = 0; r < n; r++) {
            std::vector<long long> newDp(k, 0);
            int valMod = nums[r] % k;
            for (int rem = 0; rem < k; rem++) {
                if (dp[rem] > 0) {
                    int newRem = (rem * valMod) % k;
                    newDp[newRem] += dp[rem];
                }
            }
            newDp[valMod]++;
            for (int x = 0; x < k; x++) {
                result[x] += newDp[x];
            }
            dp = std::move(newDp);
        }
        return result;
    }
};
