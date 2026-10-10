#include <vector>
#include <cmath>
#include <cstdlib>

using namespace std;

class Solution {
public:
    long long minSumSquareDiff(vector<int>& nums1, vector<int>& nums2,
                               int k1, int k2) {
        const int maxDiff = 100000;
        vector<long long> cnt(maxDiff + 2, 0);

        int n = nums1.size();

        for (int i = 0; i < n; i++) {
            cnt[abs(nums1[i] - nums2[i])]++;
        }

        long long k = (long long)k1 + k2;

        for (int d = maxDiff; d >= 1 && k > 0; d--) {
            if (cnt[d] == 0) continue;

            if (cnt[d] <= k) {
                k -= cnt[d];
                cnt[d - 1] += cnt[d];
                cnt[d] = 0;
            } else {
                cnt[d - 1] += k;
                cnt[d] -= k;
                k = 0;
            }
        }

        long long ans = 0;

        for (int d = 1; d <= maxDiff; d++) {
            ans += 1LL * d * d * cnt[d];
        }

        return ans;
    }
};
