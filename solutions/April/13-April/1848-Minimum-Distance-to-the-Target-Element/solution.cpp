#include <vector>
#include <cmath>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int getMinDistance(vector<int>& nums, int target, int start) {
        int minDistance = INT_MAX;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] == target) {
                minDistance = min(minDistance, abs(i - start));
                if (minDistance == 0) return 0;
            }
        }
        return minDistance;
    }
};
