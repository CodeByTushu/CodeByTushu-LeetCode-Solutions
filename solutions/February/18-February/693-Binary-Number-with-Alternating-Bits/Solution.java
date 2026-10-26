/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean hasAlternatingBits(int n) {
        long x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }
}
