#include <vector>
#include <deque>

class Solution {
public:
    long long countNonDecreasingSubarrays(std::vector<int>& nums, int k) {
        int n = static_cast<int>(nums.size());
        std::vector<long long> pre(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pre[i + 1] = pre[i] + nums[i];
        }

        std::deque<int> dq; // front = left side
        long long total = 0;
        int r = n - 1;
        long long ans = 0;

        for (int l = n - 1; l >= 0; --l) {
            // Add nums[l] to the left, pop smaller/equal records
            while (!dq.empty() && nums[dq.front()] <= nums[l]) {
                int f = dq.front();
                dq.pop_front();
                int end = dq.empty() ? r + 1 : dq.front();
                total -= static_cast<long long>(nums[f]) * (end - f);
            }
            int end = dq.empty() ? r + 1 : dq.front();
            total += static_cast<long long>(nums[l]) * (end - l);
            dq.push_front(l);

            // cost = sum(prefixMax) - sum(nums) in window [l..r]
            long long cost = total - (pre[r + 1] - pre[l]);

            // If cost > k, shrink window from right side
            while (cost > k) {
                int last = dq.back();
                total -= nums[last];
                if (last == r) {
                    dq.pop_back();
                }
                --r;
                cost = total - (pre[r + 1] - pre[l]);
            }

            ans += (r - l + 1);
        }

        return ans;
    }
};
