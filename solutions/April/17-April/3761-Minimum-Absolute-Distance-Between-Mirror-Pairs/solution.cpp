/**
 * Problem: LeetCode 3761 - Minimum Absolute Distance Between Mirror Pairs
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <unordered_map>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
private:
    int reverseNum(int x) {
        long long rev = 0;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        return rev > 1000000000LL ? -1 : static_cast<int>(rev);
    }

public:
    int minMirrorPairDistance(vector<int>& nums) {
        unordered_map<int, int> lastSeen;
        int minDistance = INT_MAX;

        for (int j = 0; j < static_cast<int>(nums.size()); ++j) {
            const int val = nums[j];

            // Check if nums[j] matches reverse(nums[i]) from an earlier index i
            auto it = lastSeen.find(val);
            if (it != lastSeen.end()) {
                const int dist = j - it->second;
                minDistance = min(minDistance, dist);
                if (minDistance == 1) {
                    return 1;
                }
            }

            // Record reverse(nums[j]) with its current index j
            const int rev = reverseNum(val);
            if (rev != -1) {
                lastSeen[rev] = j;
            }
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
