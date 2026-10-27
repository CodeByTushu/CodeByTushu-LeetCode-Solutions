/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minPartitions(string n) {
        int maxDigit = 0;
        for (char ch : n) {
            int digit = ch - '0';
            if (digit > maxDigit) {
                maxDigit = digit;
                if (maxDigit == 9) {
                    return 9; // Early exit optimization
                }
            }
        }
        return maxDigit;
    }
};
