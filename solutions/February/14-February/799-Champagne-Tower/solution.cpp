/**
 * Problem: LeetCode 799 - Champagne Tower
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> tower(query_row + 2, vector<double>(query_row + 2, 0.0));
        tower[0][0] = poured;

        for (int r = 0; r <= query_row; r++) {
            for (int c = 0; c <= r; c++) {
                if (tower[r][c] > 1.0) {
                    double overflow = (tower[r][c] - 1.0) / 2.0;
                    tower[r + 1][c] += overflow;
                    tower[r + 1][c + 1] += overflow;
                }
            }
        }

        return min(1.0, tower[query_row][query_glass]);
    }
};
