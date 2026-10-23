#include <vector>

using namespace std;

/**
 * Problem: LeetCode 1861 - Rotating the Box
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int m = boxGrid.size();
        int n = boxGrid[0].size();

        // Step 1: Simulate gravity row by row (falling to the right)
        for (int i = 0; i < m; i++) {
            int emptySlot = n - 1;
            for (int j = n - 1; j >= 0; j--) {
                if (boxGrid[i][j] == '*') {
                    emptySlot = j - 1;
                } else if (boxGrid[i][j] == '#') {
                    boxGrid[i][j] = '.';
                    boxGrid[i][emptySlot] = '#';
                    emptySlot--;
                }
            }
        }

        // Step 2: Rotate 90 degrees clockwise into an n x m grid
        vector<vector<char>> res(n, vector<char>(m));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                res[j][m - 1 - i] = boxGrid[i][j];
            }
        }

        return res;
    }
};
