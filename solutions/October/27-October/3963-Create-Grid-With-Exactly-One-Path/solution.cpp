/**
 * Problem: LeetCode 3963 - Create Grid With Exactly One Path
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> createGrid(int m, int n) {
        vector<string> grid(m);
        for (int i = 0; i < m; i++) {
            string row = "";
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == n - 1) {
                    row += '.';
                } else {
                    row += '#';
                }
            }
            grid[i] = row;
        }
        return grid;
    }
};
