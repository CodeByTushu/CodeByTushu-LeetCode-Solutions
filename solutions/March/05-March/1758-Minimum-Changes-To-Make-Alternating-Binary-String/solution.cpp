/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minOperations(string s) {
        int diff0 = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s[i] != expected) {
                diff0++;
            }
        }

        return min(diff0, n - diff0);
    }
};
