/**
 * Problem: 1886. Determine Whether Matrix Can Be Obtained By Rotation
 * Difficulty: Easy
 * Language: C++
 * 
 * Approach:
 * Verify if target matches mat under any of the 4 clockwise rotations (0, 90, 180, 270 degrees).
 * We maintain 4 boolean flags corresponding to each rotation and evaluate them in a single pass:
 * - 0 deg:   mat[i][j] == target[i][j]
 * - 90 deg:  mat[i][j] == target[j][n - 1 - i]
 * - 180 deg: mat[i][j] == target[n - 1 - i][n - 1 - j]
 * - 270 deg: mat[i][j] == target[n - 1 - j][i]
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) auxiliary space
 */

#include <vector>

using namespace std;

class Solution {
public:
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        int n = mat.size();
        bool r0 = true, r90 = true, r180 = true, r270 = true;

        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (mat[i][j] != target[i][j]) r0 = false;
                if (mat[i][j] != target[j][n - 1 - i]) r90 = false;
                if (mat[i][j] != target[n - 1 - i][n - 1 - j]) r180 = false;
                if (mat[i][j] != target[n - 1 - j][i]) r270 = false;
            }
        }

        return r0 || r90 || r180 || r270;
    }
};
