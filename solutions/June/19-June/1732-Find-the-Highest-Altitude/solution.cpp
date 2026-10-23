#include <vector>
#include <algorithm>

using namespace std;

/**
 * Problem: LeetCode 1732 - Find the Highest Altitude
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int altitude = 0;
        int maxAltitude = 0;
        for (int g : gain) {
            altitude += g;
            maxAltitude = max(maxAltitude, altitude);
        }
        return maxAltitude;
    }
};
