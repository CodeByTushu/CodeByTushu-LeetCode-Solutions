/**
 * Problem: LeetCode 2515 - Shortest Distance to Target String in a Circular Array
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>
#include <algorithm>
#include <climits>
#include <cmath>

using namespace std;

class Solution {
public:
    int closestTarget(vector<string>& words, string target, int startIndex) {
        int n = words.size();
        int minDistance = INT_MAX;

        for (int i = 0; i < n; i++) {
            if (words[i] == target) {
                int direct = abs(i - startIndex);
                int circular = n - direct;
                minDistance = min(minDistance, min(direct, circular));
            }
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
