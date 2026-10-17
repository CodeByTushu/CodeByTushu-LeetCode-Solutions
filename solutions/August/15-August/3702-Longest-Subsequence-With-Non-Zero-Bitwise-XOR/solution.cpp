#include <vector>

using namespace std;

class Solution {
public:
    int longestSubsequence(vector<int>& nums) {
        int totalXor = 0;
        bool hasNonZero = false;

        for (int num : nums) {
            totalXor ^= num;
            if (num != 0) {
                hasNonZero = true;
            }
        }

        int n = nums.size();
        if (totalXor != 0) {
            return n;
        }

        return hasNonZero ? n - 1 : 0;
    }
};
