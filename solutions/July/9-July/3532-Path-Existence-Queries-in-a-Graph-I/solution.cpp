#include <vector>

using namespace std;

class Solution {
public:
    vector<bool> pathExistenceQueries(int n, vector<int>& nums, int maxDiff, vector<vector<int>>& queries) {
        vector<int> component(n, 0);
        int id = 0;

        // nums is sorted in non-decreasing order.
        // A difference > maxDiff creates a disconnected component boundary.
        for (int i = 1; i < n; i++) {
            if (nums[i] - nums[i - 1] > maxDiff) {
                id++;
            }
            component[i] = id;
        }

        vector<bool> ans(queries.size());
        for (size_t i = 0; i < queries.size(); i++) {
            ans[i] = (component[queries[i][0]] == component[queries[i][1]]);
        }

        return ans;
    }
};
