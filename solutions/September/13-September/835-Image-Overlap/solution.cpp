#include <vector>
#include <algorithm>

/**
 * Problem: LeetCode 835 - Image Overlap
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
    int countOverlap(const std::vector<std::vector<int>>& img1, 
                     const std::vector<std::vector<int>>& img2, 
                     int dx, int dy, int n) {
        int count = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                int nr = r + dy;
                int nc = c + dx;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    if (img1[r][c] == 1 && img2[nr][nc] == 1) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

public:
    int largestOverlap(std::vector<std::vector<int>>& img1, std::vector<std::vector<int>>& img2) {
        int n = img1.size();
        int maxOverlap = 0;
        for (int dy = -(n - 1); dy <= n - 1; dy++) {
            for (int dx = -(n - 1); dx <= n - 1; dx++) {
                maxOverlap = std::max(maxOverlap, countOverlap(img1, img2, dx, dy, n));
            }
        }
        return maxOverlap;
    }
};
