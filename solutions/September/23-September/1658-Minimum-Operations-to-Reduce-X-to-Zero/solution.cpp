#include <vector>
#include <numeric>
#include <algorithm>

class Solution {
public:
    int minOperations(std::vector<int>& nums, int x) {
        long long total = 0;
        for (int num : nums) total += num;
        long long target = total - x;
        if (target < 0) return -1;
        if (target == 0) return static_cast<int>(nums.size());

        int maxLen = -1;
        long long windowSum = 0;
        int left = 0;
        int n = static_cast<int>(nums.size());

        for (int right = 0; right < n; right++) {
            windowSum += nums[right];
            while (windowSum > target && left <= right) {
                windowSum -= nums[left];
                left++;
            }
            if (windowSum == target) {
                maxLen = std::max(maxLen, right - left + 1);
            }
        }

        return maxLen == -1 ? -1 : n - maxLen;
    }
};
