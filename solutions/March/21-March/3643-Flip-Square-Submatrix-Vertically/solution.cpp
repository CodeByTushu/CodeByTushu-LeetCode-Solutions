/**
 * Problem: LeetCode 3643 - Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
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
