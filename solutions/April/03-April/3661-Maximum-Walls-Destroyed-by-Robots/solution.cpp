#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Language: C++
 * Time Complexity: O(N log N + M log M + N log M)
 * Space Complexity: O(N)
 */
class Solution {
public:
    int maxWalls(vector<int>& robots, vector<int>& distance, vector<int>& walls) {
        int n = robots.size();
        vector<pair<int, int>> r(n);
        for (int i = 0; i < n; i++) {
            r[i] = {robots[i], distance[i]};
        }
        sort(r.begin(), r.end());
        sort(walls.begin(), walls.end());

        auto countWalls = [&](long long low, long long high) -> int {
            if (low > high) return 0;
            auto start = lower_bound(walls.begin(), walls.end(), low);
            auto end = upper_bound(walls.begin(), walls.end(), high);
            return max(0, (int)(end - start));
        };

        vector<long long> leftBound(n);
        vector<long long> rightBound(n);
        vector<int> wLeft(n);
        vector<int> wRight(n);

        for (int i = 0; i < n; i++) {
            long long lLimit = (i > 0) ? (long long)r[i - 1].first + 1 : -2e18;
            leftBound[i] = max((long long)r[i].first - r[i].second, lLimit);
            wLeft[i] = countWalls(leftBound[i], r[i].first);

            long long rLimit = (i < n - 1) ? (long long)r[i + 1].first - 1 : 2e18;
            rightBound[i] = min((long long)r[i].first + r[i].second, rLimit);
            wRight[i] = countWalls(r[i].first, rightBound[i]);
        }

        // dp0: robot i fires Left
        // dp1: robot i fires Right
        int dp0 = wLeft[0];
        int dp1 = wRight[0];

        for (int i = 1; i < n; i++) {
            int wBoth = 0;
            if (rightBound[i - 1] >= leftBound[i]) {
                wBoth = countWalls(r[i - 1].first, r[i].first);
            } else {
                wBoth = wRight[i - 1] + wLeft[i];
            }

            int nextDp0 = max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
            int nextDp1 = max(dp0, dp1) + wRight[i];

            dp0 = nextDp0;
            dp1 = nextDp1;
        }

        return max(dp0, dp1);
    }
};
