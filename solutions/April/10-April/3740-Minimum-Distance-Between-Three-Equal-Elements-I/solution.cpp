#include <vector>
#include <unordered_map>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        unordered_map<int, vector<int>> indices;
        int minDistance = INT_MAX;

        for (int i = 0; i < (int)nums.size(); ++i) {
            int val = nums[i];
            indices[val].push_back(i);

            int sz = indices[val].size();
            if (sz >= 3) {
                int first = indices[val][sz - 3];
                int third = indices[val][sz - 1];
                minDistance = min(minDistance, 2 * (third - first));
            }
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
