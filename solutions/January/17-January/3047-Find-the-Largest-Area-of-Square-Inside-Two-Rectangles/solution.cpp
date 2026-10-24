/**
 * Problem: LeetCode 3047 - Find the Largest Area of Square Inside Two Rectangles
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long largestSquareArea(vector<vector<int>>& bottomLeft, vector<vector<int>>& topRight) {
        long long maxSide = 0;
        int n = static_cast<int>(bottomLeft.size());

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int xMin = max(bottomLeft[i][0], bottomLeft[j][0]);
                int xMax = min(topRight[i][0], topRight[j][0]);
                int yMin = max(bottomLeft[i][1], bottomLeft[j][1]);
                int yMax = min(topRight[i][1], topRight[j][1]);

                int width = xMax - xMin;
                int height = yMax - yMin;

                if (width > 0 && height > 0) {
                    long long side = min(width, height);
                    if (side > maxSide) {
                        maxSide = side;
                    }
                }
            }
        }

        return maxSide * maxSide;
    }
};
