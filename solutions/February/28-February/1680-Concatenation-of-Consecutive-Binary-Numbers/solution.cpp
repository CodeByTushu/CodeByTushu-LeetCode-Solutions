/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <iostream>

using namespace std;

class Solution {
public:
    int concatenatedBinary(int n) {
        long long ans = 0;
        int bitLength = 0;
        const long long MOD = 1'000'000'007LL;

        for (int i = 1; i <= n; i++) {
            // When i is a power of 2, its binary representation increases by 1 bit
            if ((i & (i - 1)) == 0) {
                bitLength++;
            }
            ans = ((ans << bitLength) | i) % MOD;
        }

        return static_cast<int>(ans);
    }
};
