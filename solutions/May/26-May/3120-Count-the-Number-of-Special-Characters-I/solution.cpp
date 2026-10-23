/**
 * Problem: LeetCode 3120 - Count the Number of Special Characters I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    int numberOfSpecialChars(string word) {
        int lowerMask = 0;
        int upperMask = 0;

        for (char ch : word) {
            if (ch >= 'a' && ch <= 'z') {
                lowerMask |= (1 << (ch - 'a'));
            } else if (ch >= 'A' && ch <= 'Z') {
                upperMask |= (1 << (ch - 'A'));
            }
        }

        return __builtin_popcount(lowerMask & upperMask);
    }
};
