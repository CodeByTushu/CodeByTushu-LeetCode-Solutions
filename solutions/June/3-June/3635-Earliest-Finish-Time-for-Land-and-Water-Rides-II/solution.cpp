#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 3635 - Earliest Finish Time for Land and Water Rides II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int earliestFinishTime(vector<int>& landStartTime, vector<int>& landDuration,
                           vector<int>& waterStartTime, vector<int>& waterDuration) {
        int ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration);
        int ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration);
        return min(ans1, ans2);
    }

private:
    int solve(const vector<int>& firstStart, const vector<int>& firstDur,
              const vector<int>& secondStart, const vector<int>& secondDur) {
        int m = secondStart.size();
        vector<pair<int, int>> rides(m);
        for (int i = 0; i < m; ++i) {
            rides[i] = {secondStart[i], secondDur[i]};
        }

        sort(rides.begin(), rides.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first < b.first;
        });

        vector<int> starts(m);
        vector<int> prefixMinDur(m);
        vector<int> suffixMinOpenFinish(m);

        for (int i = 0; i < m; ++i) {
            starts[i] = rides[i].first;
        }

        prefixMinDur[0] = rides[0].second;
        for (int i = 1; i < m; ++i) {
            prefixMinDur[i] = min(prefixMinDur[i - 1], rides[i].second);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1].first + rides[m - 1].second;
        for (int i = m - 2; i >= 0; --i) {
            suffixMinOpenFinish[i] = min(suffixMinOpenFinish[i + 1], rides[i].first + rides[i].second);
        }

        int ans = INT_MAX;

        for (size_t i = 0; i < firstStart.size(); ++i) {
            int t = firstStart[i] + firstDur[i];
            int idx = lower_bound(starts.begin(), starts.end(), t) - starts.begin();

            int best = INT_MAX;

            // rides with start >= t
            if (idx < m) {
                best = min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = min(best, t + prefixMinDur[idx - 1]);
            }

            ans = min(ans, best);
        }

        return ans;
    }
};
