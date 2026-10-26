/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool hasAlternatingBits(int n) {
        long long x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }
};
