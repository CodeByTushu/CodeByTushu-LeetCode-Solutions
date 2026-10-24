/**
 * Problem: LeetCode 1266 - Minimum Time Visiting All Points
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <cmath>
#include <algorithm>

class Solution {
public:
    int minTimeToVisitAllPoints(std::vector<std::vector<int>>& points) {
        int totalTime = 0;

        for (size_t i = 1; i < points.size(); ++i) {
            int dx = std::abs(points[i][0] - points[i - 1][0]);
            int dy = std::abs(points[i][1] - points[i - 1][1]);
            // Chebyshev distance: max(|dx|, |dy|)
            totalTime += std::max(dx, dy);
        }

        return totalTime;
    }
};
