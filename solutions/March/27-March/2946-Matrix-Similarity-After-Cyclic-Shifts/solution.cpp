/**
 * Problem: 2946. Matrix Similarity After Cyclic Shifts
 * Difficulty: Easy
 * Language: C++
 * 
 * Approach:
 * Each row undergoes a cyclic shift by k positions (left for even indices, right for odd indices).
 * A row of length n remains identical to itself after shifting if and only if
 * mat[i][j] == mat[i][(j + k) % n] for all j.
 * 
 * By reducing k modulo n, we directly compare each cell with its counterpart at (j + k) % n.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) auxiliary space
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
