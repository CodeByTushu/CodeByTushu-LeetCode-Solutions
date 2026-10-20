#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int sortableIntegers(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;

        for (int k = 1; k <= n; k++) {
            if (n % k != 0) continue;
            if (isSortable(nums, n, k)) {
                ans += k;
            }
        }
        return ans;
    }

private:
    bool isSortable(const vector<int>& nums, int n, int k) {
        int prevMax = 0;
        for (int start = 0; start < n; start += k) {
            int mn = INT_MAX, mx = INT_MIN;
            int desc = 0;
            int end = start + k;
            for (int i = start; i < end; i++) {
                mn = min(mn, nums[i]);
                mx = max(mx, nums[i]);
                int next = (i + 1 < end) ? i + 1 : start;
                if (nums[i] > nums[next]) {
                    desc++;
                }
            }
            if (desc > 1) return false;
            if (mn < prevMax) return false;

            prevMax = mx;
        }
        return true;
    }
};
