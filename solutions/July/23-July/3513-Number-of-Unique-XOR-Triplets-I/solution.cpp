#include <vector>

class Solution {
public:
    int uniqueXorTriplets(std::vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 1;
        if (n == 2) return 2;
        int ans = 1;
        while (ans <= n) {
            ans <<= 1;
        }
        return ans;
    }
};
