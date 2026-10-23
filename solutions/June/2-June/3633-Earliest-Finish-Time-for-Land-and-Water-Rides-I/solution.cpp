#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 3633 - Earliest Finish Time for Land and Water Rides I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int earliestFinishTime(vector<int>& landStartTime, vector<int>& landDuration, vector<int>& waterStartTime, vector<int>& waterDuration) {
        int answer = INT_MAX;

        // Land ride first, then Water ride
        for (size_t i = 0; i < landStartTime.size(); ++i) {
            int landFinish = landStartTime[i] + landDuration[i];
            for (size_t j = 0; j < waterStartTime.size(); ++j) {
                int waterStart = max(landFinish, waterStartTime[j]);
                int totalFinish = waterStart + waterDuration[j];
                answer = min(answer, totalFinish);
            }
        }

        // Water ride first, then Land ride
        for (size_t i = 0; i < waterStartTime.size(); ++i) {
            int waterFinish = waterStartTime[i] + waterDuration[i];
            for (size_t j = 0; j < landStartTime.size(); ++j) {
                int landStart = max(waterFinish, landStartTime[j]);
                int totalFinish = landStart + landDuration[j];
                answer = min(answer, totalFinish);
            }
        }

        return answer;
    }
};
