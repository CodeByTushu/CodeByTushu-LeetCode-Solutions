/**
 * Problem: LeetCode 3719 - Longest Balanced Subarray I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestBalanced(vector<int>& nums) {
        int n = nums.size();
        int maxLen = 0;

        vector<int> lastSeen(100001, 0);

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }

            int distinctEven = 0;
            int distinctOdd = 0;
            int currentIteration = i + 1;

            for (int j = i; j < n; j++) {
                int val = nums[j];
                if (lastSeen[val] != currentIteration) {
                    lastSeen[val] = currentIteration;
                    if ((val & 1) == 0) {
                        distinctEven++;
                    } else {
                        distinctOdd++;
                    }
                }

                if (distinctEven == distinctOdd) {
                    maxLen = max(maxLen, j - i + 1);
                }
            }
        }

        return maxLen;
    }
};
