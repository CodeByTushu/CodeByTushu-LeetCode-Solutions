/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <algorithm>

class Solution {
public:
    int countPrimeSetBits(int left, int right) {
        // Primes <= 19: 2, 3, 5, 7, 11, 13, 17, 19
        const int primeMask = 665772;
        int count = 0;

        for (int i = left; i <= right; i++) {
            int setBits = __builtin_popcount(i);
            if ((primeMask >> setBits) & 1) {
                count++;
            }
        }

        return count;
    }
};
