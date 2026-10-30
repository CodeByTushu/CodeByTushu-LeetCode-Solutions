/**
 * Problem: 3212. Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: C++
 * 
 * Approach:
 * Every submatrix containing grid[0][0] is uniquely defined by its bottom-right cell (i, j).
 * We maintain running column prefix counts colX and colY of sizes n.
 * For each cell (i, j), we accumulate column frequencies across the row,
 * giving the exact count of 'X' and 'Y' in the submatrix from (0, 0) to (i, j).
 * If countX == countY and countX > 0, increment the answer.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(n) auxiliary space
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
