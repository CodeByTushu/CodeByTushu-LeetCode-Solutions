/**
 * Problem: LeetCode 3212 - Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int numberOfSubmatrices(vector<vector<char>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<int> colX(n, 0);
        vector<int> colY(n, 0);
        int count = 0;

        for (int i = 0; i < m; i++) {
            int currentX = 0;
            int currentY = 0;
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 'X') {
                    colX[j]++;
                } else if (grid[i][j] == 'Y') {
                    colY[j]++;
                }
                currentX += colX[j];
                currentY += colY[j];

                if (currentX == currentY && currentX > 0) {
                    count++;
                }
            }
        }

        return count;
    }
};
