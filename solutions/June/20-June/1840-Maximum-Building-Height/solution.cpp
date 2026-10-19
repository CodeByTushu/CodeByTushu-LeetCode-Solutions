#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxBuilding(int n, vector<vector<int>>& restrictions) {
        vector<vector<int>> list;
        list.push_back({1, 0});
        for (const auto& r : restrictions) {
            list.push_back(r);
        }

        bool hasN = false;
        for (const auto& r : list) {
            if (r[0] == n) {
                hasN = true;
                break;
            }
        }
        if (!hasN) {
            list.push_back({n, n - 1});
        }

        sort(list.begin(), list.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });

        int m = list.size();

        // Left to right pass
        for (int i = 1; i < m; i++) {
            int dist = list[i][0] - list[i - 1][0];
            list[i][1] = min(list[i][1], list[i - 1][1] + dist);
        }

        // Right to left pass
        for (int i = m - 2; i >= 0; i--) {
            int dist = list[i + 1][0] - list[i][0];
            list[i][1] = min(list[i][1], list[i + 1][1] + dist);
        }

        int ans = 0;
        for (int i = 1; i < m; i++) {
            int x1 = list[i - 1][0];
            int h1 = list[i - 1][1];
            int x2 = list[i][0];
            int h2 = list[i][1];
            int dist = x2 - x1;
            int peak = (h1 + h2 + dist) / 2;
            ans = max(ans, peak);
        }

        return ans;
    }
};
