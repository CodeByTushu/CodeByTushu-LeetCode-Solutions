/**
 * Problem: 3643. Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: C++
 * 
 * Approach:
 * The square submatrix spans rows [x, x + k - 1] and columns [y, y + k - 1].
 * We use two row pointers initialized at top = x and bottom = x + k - 1.
 * For each pair of rows, we swap elements column-by-column across the submatrix width.
 * Then move top downward and bottom upward until they meet.
 * 
 * Time Complexity: O(k^2)
 * Space Complexity: O(1) auxiliary space
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> flipSubmatrix(vector<vector<int>>& grid, int x, int y, int k) {
        int top = x;
        int bottom = x + k - 1;

        while (top < bottom) {
            for (int j = y; j < y + k; ++j) {
                swap(grid[top][j], grid[bottom][j]);
            }
            top++;
            bottom--;
        }

        return grid;
    }
};
