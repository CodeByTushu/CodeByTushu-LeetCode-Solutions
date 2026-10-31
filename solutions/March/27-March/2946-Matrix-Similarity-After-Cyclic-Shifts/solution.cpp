/**
 * Problem: LeetCode 2946 - Matrix Similarity After Cyclic Shifts
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    bool areSimilar(vector<vector<int>>& mat, int k) {
        int m = mat.size();
        int n = mat[0].size();
        k %= n;

        if (k == 0) {
            return true;
        }

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (mat[i][j] != mat[i][(j + k) % n]) {
                    return false;
                }
            }
        }

        return true;
    }
};
