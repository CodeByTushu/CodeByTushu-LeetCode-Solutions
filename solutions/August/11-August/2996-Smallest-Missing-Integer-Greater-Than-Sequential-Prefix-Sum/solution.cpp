#include <vector>
#include <unordered_set>

class Solution {
public:
    int missingInteger(std::vector<int>& nums) {
        int n = nums.size();
        int sum = nums[0];
        int i = 1;
        while (i < n && nums[i] == nums[i - 1] + 1) {
            sum += nums[i];
            i++;
        }

        std::unordered_set<int> num_set(nums.begin(), nums.end());
        while (num_set.count(sum)) {
            sum++;
        }

        return sum;
    }
};
