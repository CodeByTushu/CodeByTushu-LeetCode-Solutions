#include <vector>

class Solution {
    int digitSum(int n) {
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }

public:
    int smallestIndex(std::vector<int>& nums) {
        for (int i = 0; i < static_cast<int>(nums.size()); i++) {
            if (digitSum(nums[i]) == i) {
                return i;
            }
        }
        return -1;
    }
};
