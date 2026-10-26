/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minOperations(string s, int k) {
        int n = s.length();
        int c0 = 0;
        for (char ch : s) {
            if (ch == '0') {
                c0++;
            }
        }

        if (c0 == 0) {
            return 0;
        }

        int c1 = n - c0;
        int best = -1;

        // Case 1: Odd m
        if (k % 2 == c0 % 2) {
            int minM = (c0 + k - 1) / k;
            if (n == k) {
                if (c1 == 0) {
                    if (minM % 2 == 0) minM++;
                    best = (best == -1) ? minM : min(best, minM);
                }
            } else {
                minM = max(minM, (c1 + (n - k) - 1) / (n - k));
                if (minM % 2 == 0) minM++;
                best = (best == -1) ? minM : min(best, minM);
            }
        }

        // Case 2: Even m
        if (c0 % 2 == 0) {
            int minM = max(2, (c0 + k - 1) / k);
            if (n > k) {
                minM = max(minM, (c0 + (n - k) - 1) / (n - k));
                if (minM % 2 != 0) minM++;
                best = (best == -1) ? minM : min(best, minM);
            }
        }

        return best;
    }
};
