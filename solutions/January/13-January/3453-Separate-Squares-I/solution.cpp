/**
 * Problem: LeetCode 3453 - Separate Squares I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

class Solution {
public:
    double separateSquares(std::vector<std::vector<int>>& squares) {
        long long totalArea = 0;
        double low = 0.0;
        double high = 0.0;

        for (const auto& sq : squares) {
            long long l = sq[2];
            totalArea += l * l;
            high = std::max(high, static_cast<double>(sq[1] + l));
        }

        double targetArea = totalArea / 2.0;

        // Binary search for minimum horizontal line y-coordinate
        for (int iter = 0; iter < 80; ++iter) {
            double mid = low + (high - low) / 2.0;
            if (getAreaBelow(squares, mid) >= targetArea) {
                high = mid;
            } else {
                low = mid;
            }
        }

        return low;
    }

private:
    double getAreaBelow(const std::vector<std::vector<int>>& squares, double yLine) {
        double area = 0.0;
        for (const auto& sq : squares) {
            double y = sq[1];
            double l = sq[2];
            if (yLine > y) {
                double h = std::min(l, yLine - y);
                area += h * l;
            }
        }
        return area;
    }
};
