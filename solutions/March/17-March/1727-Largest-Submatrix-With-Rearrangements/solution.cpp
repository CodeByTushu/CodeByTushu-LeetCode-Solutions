/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        int maxArea = 0;

        // Compute consecutive 1s height for each column
        for (int i = 1; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    matrix[i][j] += matrix[i - 1][j];
                }
            }
        }

        // For each row, sort heights and find maximum rectangular area
        for (int i = 0; i < m; i++) {
            vector<int> row = matrix[i];
            sort(row.begin(), row.end());

            for (int j = 0; j < n; j++) {
                int height = row[j];
                int width = n - j;
                maxArea = max(maxArea, height * width);
            }
        }

        return maxArea;
    }
};
