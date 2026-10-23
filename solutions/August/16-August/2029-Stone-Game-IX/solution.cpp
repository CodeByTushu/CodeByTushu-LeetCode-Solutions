#include <vector>
#include <cmath>
#include <cstdlib>

using namespace std;

/**
 * Problem: LeetCode 2029 - Stone Game IX
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool stoneGameIX(vector<int>& stones) {
        int cnt[3] = {0, 0, 0};
        for (int s : stones) {
            cnt[s % 3]++;
        }

        if (cnt[0] % 2 == 0) {
            return cnt[1] >= 1 && cnt[2] >= 1;
        } else {
            return abs(cnt[1] - cnt[2]) > 2;
        }
    }
};
