#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> pathExistenceQueries(int n, vector<int>& nums, int maxDiff, vector<vector<int>>& queries) {
        vector<pair<int, int>> pairs(n);
        for (int i = 0; i < n; i++) {
            pairs[i] = {nums[i], i};
        }

        sort(pairs.begin(), pairs.end());

        const int LOG = 20;
        vector<vector<int>> jump(n, vector<int>(LOG));

        int r = n - 1;
        for (int l = n - 1; l >= 0; l--) {
            while (pairs[r].first - pairs[l].first > maxDiff) {
                r--;
            }

            int from = pairs[l].second;
            int to = pairs[r].second;

            jump[from][0] = to;

            for (int k = 1; k < LOG; k++) {
                jump[from][k] = jump[jump[from][k - 1]][k - 1];
            }
        }

        vector<int> ans(queries.size());

        for (size_t t = 0; t < queries.size(); t++) {
            int u = queries[t][0];
            int v = queries[t][1];

            if (nums[u] > nums[v]) {
                swap(u, v);
            }

            if (u == v) {
                ans[t] = 0;
                continue;
            }

            if (nums[u] == nums[v]) {
                ans[t] = 1;
                continue;
            }

            int dist = 0;

            for (int k = LOG - 1; k >= 0; k--) {
                if (nums[jump[u][k]] < nums[v]) {
                    dist += (1 << k);
                    u = jump[u][k];
                }
            }

            if (nums[jump[u][0]] < nums[v]) {
                ans[t] = -1;
            } else {
                ans[t] = dist + 1;
            }
        }

        return ans;
    }
};
