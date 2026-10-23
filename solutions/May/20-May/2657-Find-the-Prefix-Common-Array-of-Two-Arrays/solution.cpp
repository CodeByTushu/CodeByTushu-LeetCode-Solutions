/**
 * Problem: LeetCode 2657 - Find the Prefix Common Array of Two Arrays
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> findThePrefixCommonArray(vector<int>& A, vector<int>& B) {
        int n = A.size();
        vector<int> C(n, 0);
        vector<int> freq(n + 1, 0);
        int commonCount = 0;

        for (int i = 0; i < n; ++i) {
            if (++freq[A[i]] == 2) {
                commonCount++;
            }
            if (++freq[B[i]] == 2) {
                commonCount++;
            }
            C[i] = commonCount;
        }

        return C;
    }
};
