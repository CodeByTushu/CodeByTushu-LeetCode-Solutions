/**
 * Problem: LeetCode 2078 - Two Furthest Houses With Different Colors
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxDistance(vector<int>& colors) {
        const int n = colors.size();
        int maxDist = 0;
        
        // The furthest house with a different color must pair with either the first or last house
        for (int i = 0; i < n; ++i) {
            if (colors[i] != colors[0]) {
                maxDist = max(maxDist, i);
            }
            if (colors[i] != colors[n - 1]) {
                maxDist = max(maxDist, n - 1 - i);
            }
        }
        
        return maxDist;
    }
};
