#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int minVal = nums[0];
        int maxVal = nums[0];

        for (int num : nums) {
            minVal = min(minVal, num);
            maxVal = max(maxVal, num);
        }

        return 1LL * (maxVal - minVal) * k;
    }
};
